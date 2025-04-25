import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../../components/UI/Card';
import FormInput from '../../components/UI/FormInput';
import Button from '../../components/UI/Button';
import { User, Mail, Phone, Calendar, CreditCard, Building, Shield } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    contactNumber: currentUser?.contactNumber || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    idNumber: currentUser?.idNumber || '',
    companyName: currentUser?.companyName || ''
  });

  const [loading, setLoading] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement profile update logic
      addNotification('Profile updated successfully!', 'success');
    } catch (error) {
      addNotification('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleMfa = async () => {
    try {
      // Implement MFA toggle logic
      setMfaEnabled(!mfaEnabled);
      addNotification(
        mfaEnabled ? 'MFA disabled successfully' : 'MFA enabled successfully',
        'success'
      );
    } catch (error) {
      addNotification('Failed to update MFA settings', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card title="Personal Information">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  icon={<User className="h-5 w-5 text-gray-400" />}
                />
                
                <FormInput
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  icon={<User className="h-5 w-5 text-gray-400" />}
                />
              </div>

              <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
                icon={<Mail className="h-5 w-5 text-gray-400" />}
              />

              <FormInput
                id="contactNumber"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                icon={<Phone className="h-5 w-5 text-gray-400" />}
              />

              <FormInput
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
              />

              <FormInput
                id="idNumber"
                label="ID Number"
                value={formData.idNumber}
                onChange={handleChange}
                required
                icon={<CreditCard className="h-5 w-5 text-gray-400" />}
              />

              {currentUser?.role === 'landlord' && (
                <FormInput
                  id="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  icon={<Building className="h-5 w-5 text-gray-400" />}
                />
              )}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                fullWidth
              >
                Save Changes
              </Button>
            </form>
          </Card>
        </div>

        {/* Security Settings */}
        <div>
          <Card title="Security Settings">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button
                      variant={mfaEnabled ? 'danger' : 'primary'}
                      onClick={toggleMfa}
                    >
                      {mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Password</h3>
                <Button
                  variant="outline"
                  onClick={() => {/* Implement password change logic */}}
                >
                  Change Password
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Account Deletion</h3>
                <p className="text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="danger"
                  onClick={() => {/* Implement account deletion logic */}}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;