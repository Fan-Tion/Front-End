import React from 'react';
import { Navigate } from 'react-router-dom';


const user = {
  isLoggedIn: true, 
};

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  if (user.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}