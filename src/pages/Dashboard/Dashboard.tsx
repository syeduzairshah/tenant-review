import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getUserContracts, getUserReviews } from '../../services/supabase';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import StarRating from '../../components/UI/StarRating';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { FileText, Plus, Star, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser?.id) return;

        const [contractsData, reviewsData] = await Promise.all([
          getUserContracts(currentUser.id),
          getUserReviews(currentUser.id)
        ]);

        setContracts(contractsData || []);
        setReviews(reviewsData || []);
      } catch (err) {
        setError('Failed to load your data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) return <LoadingSpinner />;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.first_name}!</h1>
          <p className="mt-1 text-gray-600">
            Manage your contracts and reviews from your dashboard
          </p>
        </div>
        <Link to="/contract/upload">
          <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
            Upload Contract
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contracts Section */}
        <Card
          title="Your Contracts"
          subtitle={`${contracts.length} contract${contracts.length !== 1 ? 's' : ''}`}
        >
          {contracts.length === 0 ? (
            <div className="text-center py-6">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No contracts found</p>
              <Link to="/contract/upload" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Upload your first contract
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <Link
                  key={contract.id}
                  to={`/contract/${contract.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {contract.unit_number}, {contract.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {contract.city}, {contract.state}
                      </p>
                    </div>
                    {getStatusBadge(contract.status)}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {currentUser?.role === 'tenant' ? (
                      <p>Landlord: {contract.landlord?.first_name} {contract.landlord?.last_name}</p>
                    ) : (
                      <p>Tenant: {contract.tenant?.first_name} {contract.tenant?.last_name}</p>
                    )}
                    <p className="mt-1">Uploaded: {new Date(contract.uploaded_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Reviews Section */}
        <Card
          title="Your Reviews"
          subtitle={`${reviews.length} review${reviews.length !== 1 ? 's' : ''}`}
        >
          {reviews.length === 0 ? (
            <div className="text-center py-6">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No reviews yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Reviews will appear here once you have an approved contract
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {review.contract?.unit_number}, {review.contract?.street}
                      </p>
                      <div className="mt-1">
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                    </div>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      {review.reviewer_id === currentUser?.id ? 'You reviewed' : 'Reviewed by'}{' '}
                      {review.reviewer_id === currentUser?.id
                        ? `${review.reviewed?.first_name} ${review.reviewed?.last_name}`
                        : `${review.reviewer?.first_name} ${review.reviewer?.last_name}`
                    }
                    </p>
                    <p className="mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;