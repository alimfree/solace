/**
 * Advocate interface based on database schema
 * Only exposing fields necessary for the frontend
 */
export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number; // Only for display, no editing
}

/**
 * API response type for advocates endpoint
 */
export interface AdvocatesResponse {
  data: Advocate[];
}

/**
 * Computed properties for advocate display
 */
export interface AdvocateDisplayData extends Advocate {
  fullName: string;
  formattedPhone: string;
}