import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { verifyToken } from "../api/authApi"; // ✅ API to verify token

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Check token validity on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const userData = await verifyToken(token); // ✅ Verify with backend
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
    };

    checkAuth();
  }, []);

  // ✅ Ensure React updates UI after login/signup
  const handleAuthSuccess = (token, userData) => {
    console.log("✅ Authentication successful! Storing token and user data.");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData); // ✅ Update state
    setIsAuthenticated(true); // ✅ Ensure UI updates
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
      {showSignup ? (
        <SignupForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <LoginForm onAuthSuccess={handleAuthSuccess} />
      )}
      <button onClick={() => setShowSignup(!showSignup)} className="mt-4 text-blue-600 hover:underline">
        {showSignup ? "Already have an account? Log in" : "New user? Sign up"}
      </button>
    </div>
  );

  return { isAuthenticated, user, handleAuthSuccess, handleLogout, AuthComponent };
};

export default useAuthHandler;
