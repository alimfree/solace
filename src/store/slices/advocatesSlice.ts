import { StateCreator } from 'zustand';
import { Advocate } from '../../types/advocate';

export interface AdvocatesState {
  advocates: Advocate[];
  loading: boolean;
  error: string | null;
}

export interface AdvocatesActions {
  fetchAdvocates: () => Promise<void>;
  addAdvocate: (advocate: Omit<Advocate, 'id'>) => void;
  updateAdvocate: (id: number, updates: Partial<Advocate>) => void;
  deleteAdvocate: (id: number) => void;
  clearError: () => void;
}

export interface AdvocatesSlice extends AdvocatesState, AdvocatesActions {}

// Mock data for development - this would typically come from an API
const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    city: 'New York',
    degree: 'JD from Harvard Law School',
    specialties: ['Corporate Law', 'Securities Law'],
    yearsOfExperience: 12,
    phoneNumber: 2125551234
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    city: 'Los Angeles',
    degree: 'JD from Stanford Law School',
    specialties: ['Immigration Law', 'Family Law'],
    yearsOfExperience: 8,
    phoneNumber: 3105551234
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    city: 'Chicago',
    degree: 'JD from University of Chicago Law School',
    specialties: ['Criminal Law', 'Civil Rights'],
    yearsOfExperience: 15,
    phoneNumber: 3125551234
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Thompson',
    city: 'Houston',
    degree: 'JD from University of Texas School of Law',
    specialties: ['Personal Injury', 'Medical Malpractice'],
    yearsOfExperience: 20,
    phoneNumber: 7135551234
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Williams',
    city: 'Philadelphia',
    degree: 'JD from University of Pennsylvania Law School',
    specialties: ['Real Estate Law', 'Contract Law'],
    yearsOfExperience: 7,
    phoneNumber: 2155551234
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Brown',
    city: 'Phoenix',
    degree: 'JD from Arizona State University College of Law',
    specialties: ['Tax Law', 'Business Law'],
    yearsOfExperience: 10,
    phoneNumber: 6025551234
  },
  {
    id: 7,
    firstName: 'Maria',
    lastName: 'Garcia',
    city: 'San Antonio',
    degree: 'JD from St. Mary\'s University School of Law',
    specialties: ['Family Law', 'Immigration Law'],
    yearsOfExperience: 5,
    phoneNumber: 2105551234
  },
  {
    id: 8,
    firstName: 'Robert',
    lastName: 'Davis',
    city: 'San Diego',
    degree: 'JD from University of San Diego School of Law',
    specialties: ['Environmental Law', 'Intellectual Property'],
    yearsOfExperience: 18,
    phoneNumber: 6195551234
  },
  {
    id: 9,
    firstName: 'Jessica',
    lastName: 'Miller',
    city: 'Dallas',
    degree: 'JD from Southern Methodist University Dedman School of Law',
    specialties: ['Corporate Law', 'Mergers & Acquisitions'],
    yearsOfExperience: 14,
    phoneNumber: 2145551234
  },
  {
    id: 10,
    firstName: 'Christopher',
    lastName: 'Wilson',
    city: 'San Jose',
    degree: 'JD from Santa Clara University School of Law',
    specialties: ['Technology Law', 'Startup Law'],
    yearsOfExperience: 6,
    phoneNumber: 4085551234
  },
  {
    id: 11,
    firstName: 'Amanda',
    lastName: 'Taylor',
    city: 'New York',
    degree: 'JD from Columbia Law School',
    specialties: ['Employment Law', 'Labor Relations'],
    yearsOfExperience: 9,
    phoneNumber: 2125552345
  },
  {
    id: 12,
    firstName: 'Daniel',
    lastName: 'Anderson',
    city: 'Los Angeles',
    degree: 'JD from UCLA School of Law',
    specialties: ['Entertainment Law', 'Media Law'],
    yearsOfExperience: 11,
    phoneNumber: 3105552345
  }
];

// Simulate API delay
const simulateApiDelay = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const advocatesSlice: StateCreator<AdvocatesSlice> = (set, get) => ({
  // Initial state
  advocates: [],
  loading: false,
  error: null,

  // Actions
  fetchAdvocates: async () => {
    set({ loading: true, error: null });

    try {
      // Simulate API call
      await simulateApiDelay(800);

      // In a real app, this would be an actual API call:
      // const response = await fetch('/api/advocates');
      // const advocates = await response.json();

      set({
        advocates: mockAdvocates,
        loading: false
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch advocates'
      });
    }
  },

  addAdvocate: (newAdvocate) => {
    const advocates = get().advocates;
    const id = Math.max(...advocates.map(a => a.id), 0) + 1;

    const advocate: Advocate = {
      ...newAdvocate,
      id
    };

    set({
      advocates: [...advocates, advocate]
    });
  },

  updateAdvocate: (id, updates) => {
    const advocates = get().advocates;

    set({
      advocates: advocates.map(advocate =>
        advocate.id === id ? { ...advocate, ...updates } : advocate
      )
    });
  },

  deleteAdvocate: (id) => {
    const advocates = get().advocates;

    set({
      advocates: advocates.filter(advocate => advocate.id !== id)
    });
  },

  clearError: () => {
    set({ error: null });
  },
});