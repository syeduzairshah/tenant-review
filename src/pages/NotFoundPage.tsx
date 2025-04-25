import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-blue-800" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been removed, renamed, or doesn't exist.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button
              variant="primary"
              fullWidth
              icon={<Home className="h-5 w-5" />}
            >
              Back to Home
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <a
              href="mailto:support@tenantreview.com"
              className="text-blue-600 hover:text-blue-800"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;