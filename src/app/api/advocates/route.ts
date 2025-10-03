import db from "../../../db";
import { advocates } from "../../../db/schema";
import { and, or, like, ilike, sql, gte, lte, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    const specialty = searchParams.get('specialty') || '';
    const degree = searchParams.get('degree') || '';
    const experience = searchParams.get('experience') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Search across name, city, and specialties
    if (search) {
      conditions.push(
        or(
          ilike(advocates.firstName, `%${search}%`),
          ilike(advocates.lastName, `%${search}%`),
          ilike(advocates.city, `%${search}%`),
          sql`${advocates.specialties}::text ILIKE ${'%' + search + '%'}`
        )
      );
    }

    // City filter
    if (city) {
      conditions.push(ilike(advocates.city, `%${city}%`));
    }

    // Specialty filter - search within the JSON array
    if (specialty) {
      conditions.push(
        sql`${advocates.specialties}::text ILIKE ${'%' + specialty + '%'}`
      );
    }

    // Degree filter
    if (degree) {
      conditions.push(eq(advocates.degree, degree));
    }

    // Experience filter
    if (experience) {
      switch (experience) {
        case '0-2':
          conditions.push(and(gte(advocates.yearsOfExperience, 0), lte(advocates.yearsOfExperience, 2)));
          break;
        case '3-5':
          conditions.push(and(gte(advocates.yearsOfExperience, 3), lte(advocates.yearsOfExperience, 5)));
          break;
        case '6-10':
          conditions.push(and(gte(advocates.yearsOfExperience, 6), lte(advocates.yearsOfExperience, 10)));
          break;
        case '11-15':
          conditions.push(and(gte(advocates.yearsOfExperience, 11), lte(advocates.yearsOfExperience, 15)));
          break;
        case '16-20':
          conditions.push(and(gte(advocates.yearsOfExperience, 16), lte(advocates.yearsOfExperience, 20)));
          break;
        case '20+':
          conditions.push(gte(advocates.yearsOfExperience, 20));
          break;
      }
    }

    // Build query
    let query = db.select().from(advocates);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Get total count for pagination
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(advocates);
    if (conditions.length > 0) {
      countQuery.where(and(...conditions));
    }

    const [data, totalResult] = await Promise.all([
      query.limit(limit).offset(offset),
      countQuery
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch advocates' },
      { status: 500 }
    );
  }
}
