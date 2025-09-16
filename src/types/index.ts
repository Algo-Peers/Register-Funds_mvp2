export interface SchoolProfile {
  id: string;
  schoolName: string;
  country: string;
  region: string;
  isGESListed: string;
  emisCode: string;
  schoolType: string;
  challenges: string[];
  // Original address fields (kept for backward compatibility)
  address: string;
  city: string;
  postalCode: string;
  // New address fields
  addressLine1: string;
  addressLine2: string;
  digitalAddress: string;
  townCity: string;
  districtRegion: string;
  // Contact fields
  contactEmail: string;
  contactPhone: string;
  postalAddress: string;
  website?: string;
  principalName: string;
  establishedYear: number;
  logoBase64?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseSchoolProfileReturn {
  profile: SchoolProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<SchoolProfile>) => Promise<SchoolProfile>;
  refetch: () => Promise<void>;
}