import React from 'react';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${getSizeClasses()} relative mb-4`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-secondary-200 rounded-full"></div>
        
        {/* Animated spinner */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        
        {/* Inner circle */}
        <div className="absolute inset-2 bg-white rounded-full"></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-primary rounded-full"></div>
        </div>
      </div>
      
      {message && (
        <p className={`text-secondary ${getTextSize()} font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading; 