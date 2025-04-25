import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Shield, ArrowLeft } from 'lucide-react';

const VerifyMfaPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeMfaVerification, mfaRequired } = useAuth();
  const { addNotification } = useNotification();
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Check if user should be on this page
  useEffect(() => {
    if (!mfaRequired) {
      navigate('/login');
    }
  }, [mfaRequired, navigate]);
  
  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Clear error when user types
    if (error) setError(null);
    
    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Allow arrow navigation between inputs
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mfaCode = code.join('');
    if (mfaCode.length !== 6) {
      setError('Please enter all 6 digits of your verification code');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await completeMfaVerification(mfaCode);
      
      if (result.success) {
        addNotification('Verification successful!', 'success');
        navigate('/dashboard');
      } else {
        setError(result.error || 'Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const resendCode = () => {
    // In a real implementation, this would call an API to resend the code
    addNotification('A new verification code has been sent to your email', 'info');
    setTimeLeft(120); // Reset timer
  };
  
  const goBack = () => {
    navigate('/login');
  };
  
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Two-Factor Authentication</h1>
        <p className="mt-2 text-gray-600">
          Please enter the 6-digit verification code sent to your email.
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={code.join('').length !== 6}
            className="py-3"
          >
            Verify
          </Button>
          
          <div className="flex flex-col items-center text-sm text-gray-600 space-y-4">
            <p>
              Code expires in <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
            
            <button
              type="button"
              onClick={resendCode}
              disabled={timeLeft > 0}
              className={`text-blue-600 hover:text-blue-800 ${
                timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {timeLeft > 0
                ? `Resend code in ${formatTime(timeLeft)}`
                : 'Resend verification code'}
            </button>
            
            <button
              type="button"
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </button>
          </div>
        </form>
      </Card>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Having trouble? Please contact{' '}
          <a href="mailto:support@tenantreview.com" className="text-blue-600 hover:underline">
            support@tenantreview.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyMfaPage;