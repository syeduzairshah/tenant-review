import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../../components/UI/Card';
import FormInput from '../../components/UI/FormInput';
import FormSelect from '../../components/UI/FormSelect';
import Button from '../../components/UI/Button';
import { User, Mail, Phone, Calendar, CreditCard, Building, Lock, Eye, EyeOff } from 'lucide-react';

interface FormData {
  role: 'tenant' | 'landlord' | '';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  dateOfBirth: string;
  idNumber: string;
  companyType: 'individual' | 'business' | '';
  companyName: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addNotification } = useNotification();
  
  const [formData, setFormData] = useState<FormData>({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    dateOfBirth: '',
    idNumber: '',
    companyType: '',
    companyName: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.role) newErrors.role = 'Please select your role';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.idNumber) newErrors.idNumber = 'ID number is required';
    
    if (formData.role === 'landlord') {
      if (!formData.companyType) newErrors.companyType = 'Please select company type';
      if (formData.companyType === 'business' && !formData.companyName) {
        newErrors.companyName = 'Company name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        addNotification('Registration successful! Welcome to TenantReview.', 'success');
        navigate('/dashboard');
      } else {
        // Check for specific error types
        if (result.error?.includes('user_already_exists') || result.error?.includes('User already registered')) {
          addNotification('An account with this email already exists. Please sign in instead.', 'error');
          setErrors(prev => ({ ...prev, email: 'Email is already registered' }));
        } else {
          addNotification(result.error || 'Registration failed. Please try again.', 'error');
        }
      }
    } catch (error: any) {
      // Handle any unexpected errors
      if (error?.message?.includes('user_already_exists') || error?.message?.includes('User already registered')) {
        addNotification('An account with this email already exists. Please sign in instead.', 'error');
        setErrors(prev => ({ ...prev, email: 'Email is already registered' }));
      } else {
        addNotification('An unexpected error occurred. Please try again later.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
        <p className="mt-2 text-lg text-gray-600">
          Join our community of tenants and landlords to build a more transparent rental market.
        </p>
      </div>
      
      <Card className="mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">I am a...</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-6 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                  formData.role === 'tenant'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'tenant' }))}
              >
                <User className={`h-10 w-10 mb-2 ${formData.role === 'tenant' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className="text-lg font-medium">Tenant</span>
                <span className="text-sm text-gray-500 mt-1">I rent properties and want to review or be reviewed</span>
              </button>
              
              <button
                type="button"
                className={`p-6 border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                  formData.role === 'landlord'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'landlord' }))}
              >
                <Building className={`h-10 w-10 mb-2 ${formData.role === 'landlord' ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className="text-lg font-medium">Landlord</span>
                <span className="text-sm text-gray-500 mt-1">I own or manage properties and want to review or be reviewed</span>
              </button>
            </div>
            
            {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
          </div>
          
          {formData.role && (
            <>
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={errors.firstName}
                    icon={<User className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <FormInput
                    id="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={errors.lastName}
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
                  error={errors.email}
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FormInput
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      error={errors.password}
                      icon={<Lock className="h-5 w-5 text-gray-400" />}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5" /> : 
                        <Eye className="h-5 w-5" />
                      }
                    </button>
                  </div>
                  
                  <div className="relative">
                    <FormInput
                      id="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      error={errors.confirmPassword}
                      icon={<Lock className="h-5 w-5 text-gray-400" />}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="h-5 w-5" /> : 
                        <Eye className="h-5 w-5" />
                      }
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="contactNumber"
                    label="Contact Number"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    error={errors.contactNumber}
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <FormInput
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    error={errors.dateOfBirth}
                    icon={<Calendar className="h-5 w-5 text-gray-400" />}
                  />
                </div>
                
                <FormInput
                  id="idNumber"
                  label="ID Number (Passport, National ID, etc.)"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  error={errors.idNumber}
                  icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
              {/* Landlord-specific fields */}
              {formData.role === 'landlord' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Business Information</h3>
                  
                  <FormSelect
                    id="companyType"
                    label="Are you an individual landlord or a business?"
                    options={[
                      { value: 'individual', label: 'Individual Landlord' },
                      { value: 'business', label: 'Business / Property Management Company' }
                    ]}
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                    error={errors.companyType}
                  />
                  
                  {formData.companyType === 'business' && (
                    <FormInput
                      id="companyName"
                      label="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      error={errors.companyName}
                      icon={<Building className="h-5 w-5 text-gray-400" />}
                    />
                  )}
                </div>
              )}
              
              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  className="py-3"
                >
                  Create Account
                </Button>
                
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </Card>
      
      {/* Trust badges */}
      <div className="mt-10">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure & Encrypted</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Your Data is Private</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>Trusted Community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;