import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

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