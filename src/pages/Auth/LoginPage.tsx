import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../../components/UI/Card';
import FormInput from '../../components/UI/FormInput';
import Button from '../../components/UI/Button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LocationState {
  from?: { pathname: string };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addNotification } = useNotification();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/dashboard';
  
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        addNotification('Login successful! Welcome back.', 'success');
        navigate('/dashboard');
      } else {
        addNotification(result.error || 'Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      addNotification('An unexpected error occurred. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mt-2 text-lg text-gray-600">
          Sign in to your account to access reviews and manage your profile.
        </p>
      </div>
      
      <Card className="mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            required
            error={errors.email}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
          />
          
          <div className="relative">
            <FormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            className="py-3"
          >
            Sign In
          </Button>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up now
            </Link>
          </p>
        </form>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This site is protected by reCAPTCHA and follows our{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>{' '}
          and{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;