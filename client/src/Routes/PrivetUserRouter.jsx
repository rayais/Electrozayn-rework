import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

  const token = localStorage.getItem('token');
  return (
    <>
      {token && user?.role !=="admin" ? children : <Navigate to="/login" />}
    </>
  );
}

export default PrivateRoute;
