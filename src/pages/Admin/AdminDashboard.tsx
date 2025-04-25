import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { getAdminContracts } from '../../services/contracts';
import { getAdminReviews } from '../../services/reviews';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Contract } from '../../types/contract';
import { Review } from '../../types/review';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractsData, reviewsData] = await Promise.all([
          getAdminContracts(),
          getAdminReviews()
        ]);
        setContracts(contractsData);
        setReviews(reviewsData);
      } catch (error) {
        addNotification('Failed to load admin data', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleContractAction = async (contractId: string, action: 'approve' | 'reject') => {
    try {
      // Implement contract approval/rejection logic
      addNotification(`Contract ${action}ed successfully`, 'success');
    } catch (error) {
      addNotification(`Failed to ${action} contract`, 'error');
    }
  };

  const handleReviewAction = async (reviewId: string, action: 'approve' | 'reject') => {
    try {
      // Implement review approval/rejection logic
      addNotification(`Review ${action}ed successfully`, 'success');
    } catch (error) {
      addNotification(`Failed to ${action} review`, 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Contracts */}
        <Card
          title="Pending Contracts"
          subtitle={`${contracts.filter(c => c.status === 'pending_review').length} contracts awaiting review`}
        >
          <div className="space-y-4">
            {contracts
              .filter(contract => contract.status === 'pending_review')
              .map(contract => (
                <div
                  key={contract.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                
                      <h3 className="font-semibold">
                        {contract.propertyAddress.unitNumber}, {contract.propertyAddress.street}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {contract.propertyAddress.city}, {contract.propertyAddress.state}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(contract.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Landlord</p>
                      <p>{contract.landlord.firstName} {contract.landlord.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tenant</p>
                      <p>{contract.tenant.firstName} {contract.tenant.lastName}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleContractAction(contract.id, 'approve')}
                      icon={<CheckCircle className="h-4 w-4" />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleContractAction(contract.id, 'reject')}
                      icon={<XCircle className="h-4 w-4" />}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Pending Reviews */}
        <Card
          title="Pending Reviews"
          subtitle={`${reviews.filter(r => r.status === 'pending').length} reviews awaiting moderation`}
        >
          <div className="space-y-4">
            {reviews
              .filter(review => review.status === 'pending')
              .map(review => (
                <div
                  key={review.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {review.propertyAddress}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {review.reviewerRole === 'tenant' ? 'Tenant Review' : 'Landlord Review'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleReviewAction(review.id, 'approve')}
                      icon={<CheckCircle className="h-4 w-4" />}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleReviewAction(review.id, 'reject')}
                      icon={<XCircle className="h-4 w-4" />}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;