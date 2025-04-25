export interface Review {
  id: string;
  contractId: string;
  reviewerId: string; // User ID of the reviewer
  reviewedId: string; // User ID of the person being reviewed
  propertyAddress: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected';
  reviewerRole: 'tenant' | 'landlord';
}

export interface ReviewFormData {
  contractId: string;
  rating: number;
  comment: string;
}