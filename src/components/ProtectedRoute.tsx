import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('Authorization'));

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('Authorization'));
  }, [Cookies]);

  //api 를 통해 로그인 상태를 확인하도록 수정할 부분
  if (isLoggedIn === false) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
}
