import React from 'react';
import { Navigate } from 'react-router-dom';


const user = {
  isLoggedIn: false,
};

interface ProtectedRouteProps{
  children : React.ReactNode;
}

export default function ProtectedRoute({children,}: ProtectedRouteProps) {
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
