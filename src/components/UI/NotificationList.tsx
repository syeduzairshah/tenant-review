import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2">
      {notifications.map(notification => {
        // Set icon and background color based on notification type
        let Icon = Info;
        let bgColor = 'bg-blue-500';
        
        if (notification.type === 'success') {
          Icon = CheckCircle;
          bgColor = 'bg-green-500';
        } else if (notification.type === 'error') {
          Icon = AlertCircle;
          bgColor = 'bg-red-500';
        } else if (notification.type === 'warning') {
          Icon = AlertTriangle;
          bgColor = 'bg-yellow-500';
        }
        
        return (
          <div
            key={notification.id}
            className={`${bgColor} text-white p-4 rounded-lg shadow-lg max-w-md flex items-start transform transition-all duration-300 ease-in-out animate-fade-in`}
          >
            <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="flex-grow">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-3 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;