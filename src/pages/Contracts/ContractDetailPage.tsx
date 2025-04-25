import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getContract } from '../../services/contracts';
import { Contract } from '../../types/contract';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Building, User, Mail, Phone, MapPin, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const ContractDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (id) {
          const data = await getContract(id);
          setContract(data);
        }
      } catch (err) {
        setError('Failed to load contract details');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!contract) return <div>Contract not found</div>;

  const getStatusBadge = () => {
    switch (contract.status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contract Details</h1>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Landlord Information */}
        <Card title="Landlord Information" icon={<Building className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mt-1 mr-2" />
              <div>
                <p className="font-medium">{`${contract.landlord.firstName} ${contract.landlord.lastName}`}</p>
                {contract.landlord.companyName && (
                  <p className="text-gray-600">{contract.landlord.companyName}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <p>{contract.landlord.email}</p>
            </div>
            {contract.landlord.contactNumber && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <p>{contract.landlord.contactNumber}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Tenant Information */}
        <Card title="Tenant Information" icon={<User className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="h-5 w-5 text-gray-400 mt-1 mr-2" />
              <div>
                <p className="font-medium">{`${contract.tenant.firstName} ${contract.tenant.lastName}`}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <p>{contract.tenant.email}</p>
            </div>
            {contract.tenant.contactNumber && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <p>{contract.tenant.contactNumber}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Property Address */}
        <Card title="Property Address" icon={<MapPin className="h-5 w-5" />}>
          <div className="space-y-2">
            <p className="font-medium">{contract.propertyAddress.unitNumber}</p>
            <p>{contract.propertyAddress.street}</p>
            <p>{`${contract.propertyAddress.city}, ${contract.propertyAddress.state} ${contract.propertyAddress.postalCode}`}</p>
            <p>{contract.propertyAddress.country}</p>
          </div>
        </Card>

        {/* Contract Status */}
        <Card title="Contract Status" icon={<FileText className="h-5 w-5" />}>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Uploaded by</p>
              <p className="font-medium">{contract.uploadedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Upload date</p>
              <p className="font-medium">
                {new Date(contract.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            {contract.reviewedBy && (
              <div>
                <p className="text-sm text-gray-600">Reviewed by</p>
                <p className="font-medium">{contract.reviewedBy}</p>
              </div>
            )}
            {contract.rejectionReason && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                <p className="mt-1 text-red-700">{contract.rejectionReason}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        {contract.documentUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(contract.documentUrl, '_blank')}
            icon={<FileText className="h-5 w-5" />}
          >
            View Contract Document
          </Button>
        )}
        {contract.status === 'approved' && !contract.tenantHasReviewed && currentUser?.role === 'tenant' && (
          <Button
            variant="primary"
            onClick={() => {/* Navigate to review page */}}
          >
            Submit Tenant Review
          </Button>
        )}
        {contract.status === 'approved' && !contract.landlordHasReviewed && currentUser?.role === 'landlord' && (
          <Button
            variant="primary"
            onClick={() => {/* Navigate to review page */}}
          >
            Submit Landlord Review
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContractDetailPage;