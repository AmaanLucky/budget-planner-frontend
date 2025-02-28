import { useState, useEffect } from "react";
import { verifyToken } from "../api/authApi"; // ✅ API to verify token

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Check token validity on app start
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await verifyToken(token);
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("❌ Token verification failed:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Handle login/signup success & force UI update
  const handleAuthSuccess = (token, userData) => {
    if (!token) {
      console.error("❌ No token received!");
      return;
    }
  
    console.log("✅ Authentication successful! Storing token and user data.");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ✅ Handle logout & redirect to login
  const handleLogout = () => {
    console.log("❌ Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);

    // 🔹 Force UI update
    window.location.reload();
  };

  return { isAuthenticated, user, handleAuthSuccess, handleLogout, showSignup, setShowSignup, loading };
};

export default useAuthHandler;
