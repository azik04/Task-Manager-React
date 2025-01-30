import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("JWT");

      if (!token) {
        navigate("/Auth");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const { exp } = decoded;

        const currentTime = Date.now() / 1000;
        if (exp < currentTime) {
          localStorage.removeItem("JWT");
          navigate("/Auth");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("JWT");
        navigate("/Auth");
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoutes;
