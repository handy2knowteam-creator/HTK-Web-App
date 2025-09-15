import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } } = useAuth();

  if (isLoading) {
    // Optionally render a loading spinner or skeleton
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-500 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Not logged in, redirect to home or login
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    // Logged in but unauthorized role, redirect to a suitable dashboard or unauthorized page
    if (user.user_type === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else if (user.user_type === 'tradesperson') {
      return <Navigate to="/tradesperson/dashboard" replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;


