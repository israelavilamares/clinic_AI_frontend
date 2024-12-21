import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  // Si no hay token, redirige a la página de inicio de sesión
  if (!token) {
    return <Navigate to="/login" />;
  }
  // Si el token existe, permite el acceso a la ruta protegida
  return children;
};

export default ProtectedRoute;
