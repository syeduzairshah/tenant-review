import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { getContract } from '../../services/contracts';
import { submitReview } from '../../services/reviews';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import StarRating from '../../components/UI/StarRating';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Contract } from '../../types/contract';

const TenantReviewPage: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();

  const [contract, setContract] = useState<Contract | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (contractId) {
          const data = await getContract(contractId);
          setContract(data);
        }
      } catch (error) {
        addNotification('Failed to load contract details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      addNotification('Please provide a rating', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(
        {
          contractId: contractId!,
          rating,
          comment
        },
        'tenant'
      );
      addNotification('Review submitted successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      addNotification('Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!contract) return <div>Contract not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Submit Tenant Review</h1>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Property Details</h2>
            <p className="text-gray-600">
              {`${contract.propertyAddress.unitNumber}, ${contract.propertyAddress.street}`}
            </p>
            <p className="text-gray-600">
              {`${contract.propertyAddress.city}, ${contract.propertyAddress.state} ${contract.propertyAddress.postalCode}`}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Landlord</h2>
            <p className="text-gray-600">
              {`${contract.landlord.firstName} ${contract.landlord.lastName}`}
              {contract.landlord.companyName && ` (${contract.landlord.companyName})`}
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Would you recommend this property to future tenants?
            </label>
            <div className="mb-2">
              <StarRating rating={rating} setRating={setRating} size="lg" />
            </div>
            <p className="text-sm text-gray-500">
              {rating === 5 ? 'Highly Recommended' :
               rating === 4 ? 'Recommended' :
               rating === 3 ? 'Neutral' :
               rating === 2 ? 'Not Recommended' :
               rating === 1 ? 'Strongly Not Recommended' :
               'Select a rating'}
            </p>
          </div>

          <div>
            <label htmlFor="comment" className="block text-lg font-semibold mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this property and landlord..."
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={!rating}
              fullWidth
            >
              Submit Review
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TenantReviewPage;