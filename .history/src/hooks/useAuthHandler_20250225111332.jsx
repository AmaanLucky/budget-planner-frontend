import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { verifyToken } from "../api/authApi"; // ✅ Keep only verifyToken

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Check token validity on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await verifyToken(token); // ✅ Backend validation
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            handleLogout(); // ✅ Auto logout if token is invalid
          }
        } catch (error) {
          console.error("❌ Token verification failed:", error);
          handleLogout();
        }
      }
    };
    checkAuth();
  }, []);

  const handleAuthSuccess = (token, userData) => {
    console.log("✅ Authentication successful! Storing token and user data.");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("❌ Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const AuthComponent = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showSignup ? <SignupForm onAuthSuccess={(token, userData) => handleAuthSuccess(token, userData)} /> : <LoginForm onAuthSuccess={(token, userData) => handleAuthSuccess(token, userData)} />}
      <button onClick={() => setShowSignup(!showSignup)} className="mt-4 text-blue-600 hover:underline">
        {showSignup ? "Already have an account? Log in" : "New user? Sign up"}
      </button>
    </div>
  );

  return { isAuthenticated, user, handleLogout, AuthComponent };
};

export default useAuthHandler;