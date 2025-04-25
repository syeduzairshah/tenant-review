export type ContractStatus = 'pending_review' | 'approved' | 'rejected';

export interface Address {
  unitNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ContractParty {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  idNumber?: string;
  companyName?: string;
  companyType?: 'individual' | 'business';
}

export interface Contract {
  id: string;
  landlord: ContractParty;
  tenant: ContractParty;
  propertyAddress: Address;
  status: ContractStatus;
  uploadedBy: string; // user ID
  uploadedAt: string; // ISO date string
  reviewedBy?: string; // admin ID
  reviewedAt?: string; // ISO date string
  rejectionReason?: string;
  tenantHasReviewed: boolean;
  landlordHasReviewed: boolean;
  documentUrl?: string;
}

export interface ContractFormData {
  landlord: ContractParty;
  tenant: ContractParty;
  propertyAddress: Address;
  documentFile: File | null;
}