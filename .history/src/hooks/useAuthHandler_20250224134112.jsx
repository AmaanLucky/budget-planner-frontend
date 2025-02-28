import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [showSignup, setShowSignup] = useState(false);

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
      {showSignup ? <SignupForm onAuthSuccess={handleAuthSuccess} /> : <LoginForm onAuthSuccess={handleAuthSuccess} />}
      <button onClick={() => setShowSignup(!showSignup)} className="mt-4 text-blue-600 hover:underline">
        {showSignup ? "Already have an account? Log in" : "New user? Sign up"}
      </button>
    </div>
  );

  return { isAuthenticated, user, handleLogout, AuthComponent };
};

export default useAuthHandler;