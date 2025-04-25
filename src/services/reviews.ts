import { Review, ReviewFormData } from '../types/review';

// Simulated API endpoints for review services
// In a real application, these would make actual API calls to the Rails backend

export const getReviews = async (userId: string): Promise<Review[]> => {
  // Simulate API call
  console.log('Fetching reviews for user:', userId);
  
  // Mock data
  return [
    {
      id: '1',
      contractId: '2',
      reviewerId: userId,
      reviewedId: '5',
      propertyAddress: '101, 123 Main St, New York, NY',
      rating: 4,
      comment: 'Great landlord, very responsive to maintenance requests.',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved',
      reviewerRole: 'tenant'
    },
    {
      id: '2',
      contractId: '3',
      reviewerId: '5',
      reviewedId: userId,
      propertyAddress: '202, 456 Oak Ave, Chicago, IL',
      rating: 5,
      comment: 'Excellent tenant, always paid rent on time and kept the property in great condition.',
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved',
      reviewerRole: 'landlord'
    }
  ];
};

export const submitReview = async (reviewData: ReviewFormData, reviewerRole: 'tenant' | 'landlord'): Promise<Review> => {
  // Simulate API call
  console.log('Submitting review:', { reviewData, reviewerRole });
  
  // Mock response
  return {
    id: Date.now().toString(),
    contractId: reviewData.contractId,
    reviewerId: '1', // Mock user ID
    reviewedId: '5', // Mock reviewed user ID
    propertyAddress: '101, 123 Main St, New York, NY',
    rating: reviewData.rating,
    comment: reviewData.comment,
    createdAt: new Date().toISOString(),
    status: 'pending',
    reviewerRole
  };
};

export const updateReviewStatus = async (
  reviewId: string, 
  status: 'approved' | 'rejected'
): Promise<Review> => {
  // Simulate API call
  console.log('Updating review status:', { reviewId, status });
  
  // Mock updated review
  return {
    id: reviewId,
    contractId: '2',
    reviewerId: '1',
    reviewedId: '5',
    propertyAddress: '101, 123 Main St, New York, NY',
    rating: 4,
    comment: 'Great landlord, very responsive to maintenance requests.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status,
    reviewerRole: 'tenant'
  };
};

export const getAdminReviews = async (): Promise<Review[]> => {
  // Simulate API call for admin
  console.log('Fetching reviews for admin');
  
  // Mock data
  return [
    {
      id: '1',
      contractId: '2',
      reviewerId: '1',
      reviewedId: '5',
      propertyAddress: '101, 123 Main St, New York, NY',
      rating: 4,
      comment: 'Great landlord, very responsive to maintenance requests.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      reviewerRole: 'tenant'
    },
    {
      id: '2',
      contractId: '3',
      reviewerId: '5',
      reviewedId: '1',
      propertyAddress: '202, 456 Oak Ave, Chicago, IL',
      rating: 5,
      comment: 'Excellent tenant, always paid rent on time and kept the property in great condition.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      reviewerRole: 'landlord'
    },
    {
      id: '3',
      contractId: '4',
      reviewerId: '6',
      reviewedId: '7',
      propertyAddress: '303, 789 Pine St, Los Angeles, CA',
      rating: 2,
      comment: 'Landlord was unresponsive to maintenance requests.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved',
      reviewerRole: 'tenant'
    }
  ];
};