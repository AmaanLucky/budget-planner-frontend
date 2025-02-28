import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Handle Login & Signup Success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // ✅ Authentication Component (Login / Signup)
  const AuthComponent = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {showSignup ? (
        <SignupForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <LoginForm onAuthSuccess={handleAuthSuccess} />
      )}
      <button
        onClick={() => setShowSignup(!showSignup)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {showSignup ? "Already have an account? Login" : "New user? Sign up"}
      </button>
    </div>
  );

  return { isAuthenticated, handleLogout, AuthComponent };
};

export default useAuthHandler;