import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './SilentRenew.css';

const SilentRenew = () => {
  const { completeSilentRenew } = useAuth();

  useEffect(() => {
    const handleSilentRenew = async () => {
      try {
        console.log('Handling silent token renewal...');
        await completeSilentRenew();
        console.log('Silent token renewal completed successfully');
      } catch (error) {
        console.error('Silent token renewal failed:', error);
        // If silent renewal fails, redirect to login
        window.location.href = '/';
      }
    };

    handleSilentRenew();
  }, [completeSilentRenew]);

  // This component doesn't render anything visible
  return null;
};

export default SilentRenew; 