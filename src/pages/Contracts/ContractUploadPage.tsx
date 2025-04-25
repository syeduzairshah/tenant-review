import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { uploadContract } from '../../services/contracts';
import Card from '../../components/UI/Card';
import FormInput from '../../components/UI/FormInput';
import FormSelect from '../../components/UI/FormSelect';
import Button from '../../components/UI/Button';
import { Building, User, Mail, Phone, MapPin } from 'lucide-react';

const ContractUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    landlord: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      companyType: '',
      contactNumber: ''
    },
    tenant: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: ''
    },
    propertyAddress: {
      unitNumber: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },
    documentFile: null as File | null
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, documentFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await uploadContract(formData);
      addNotification('Contract uploaded successfully!', 'success');
      navigate(`/contract/${result.id}`);
    } catch (error) {
      addNotification('Failed to upload contract. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Tenancy Contract</h1>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Landlord Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Landlord Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="landlordFirstName"
                label="First Name"
                value={formData.landlord.firstName}
                onChange={(e) => handleChange('landlord', 'firstName', e.target.value)}
                required
                icon={<User className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="landlordLastName"
                label="Last Name"
                value={formData.landlord.lastName}
                onChange={(e) => handleChange('landlord', 'lastName', e.target.value)}
                required
                icon={<User className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="landlordEmail"
                label="Email"
                type="email"
                value={formData.landlord.email}
                onChange={(e) => handleChange('landlord', 'email', e.target.value)}
                required
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="landlordPhone"
                label="Contact Number"
                value={formData.landlord.contactNumber}
                onChange={(e) => handleChange('landlord', 'contactNumber', e.target.value)}
                required
                icon={<Phone className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </div>

          {/* Tenant Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Tenant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="tenantFirstName"
                label="First Name"
                value={formData.tenant.firstName}
                onChange={(e) => handleChange('tenant', 'firstName', e.target.value)}
                required
                icon={<User className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="tenantLastName"
                label="Last Name"
                value={formData.tenant.lastName}
                onChange={(e) => handleChange('tenant', 'lastName', e.target.value)}
                required
                icon={<User className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="tenantEmail"
                label="Email"
                type="email"
                value={formData.tenant.email}
                onChange={(e) => handleChange('tenant', 'email', e.target.value)}
                required
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="tenantPhone"
                label="Contact Number"
                value={formData.tenant.contactNumber}
                onChange={(e) => handleChange('tenant', 'contactNumber', e.target.value)}
                required
                icon={<Phone className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </div>

          {/* Property Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Property Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="unitNumber"
                label="Unit/Apt Number"
                value={formData.propertyAddress.unitNumber}
                onChange={(e) => handleChange('propertyAddress', 'unitNumber', e.target.value)}
                required
                icon={<Building className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="street"
                label="Street Address"
                value={formData.propertyAddress.street}
                onChange={(e) => handleChange('propertyAddress', 'street', e.target.value)}
                required
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
              />
              <FormInput
                id="city"
                label="City"
                value={formData.propertyAddress.city}
                onChange={(e) => handleChange('propertyAddress', 'city', e.target.value)}
                required
              />
              <FormInput
                id="state"
                label="State/Province"
                value={formData.propertyAddress.state}
                onChange={(e) => handleChange('propertyAddress', 'state', e.target.value)}
                required
              />
              <FormInput
                id="country"
                label="Country"
                value={formData.propertyAddress.country}
                onChange={(e) => handleChange('propertyAddress', 'country', e.target.value)}
                required
              />
              <FormInput
                id="postalCode"
                label="Postal Code"
                value={formData.propertyAddress.postalCode}
                onChange={(e) => handleChange('propertyAddress', 'postalCode', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contract Document Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contract Document</h2>
            <div className="mt-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload the signed tenancy contract (PDF, DOC, or DOCX format)
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="mt-6"
            fullWidth
          >
            Upload Contract
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContractUploadPage;