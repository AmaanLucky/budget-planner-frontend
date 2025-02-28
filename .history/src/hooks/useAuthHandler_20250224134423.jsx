import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const useAuthHandler = () => {
  // ✅ Initialize authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [showSignup, setShowSignup] = useState(false);

  // ✅ Log authentication state changes
  useEffect(() => {
    console.log(`🔄 Auth State Updated: ${isAuthenticated ? `Authenticated ✅ (${user?.name})` : "Not Authenticated ❌"}`);
  }, [isAuthenticated, user]);

  // ✅ Handle Login & Signup Success
  const handleAuthSuccess = (token, userData) => {
    console.log("✅ Authentication successful! Storing token and user data.");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // ✅ Logout Function
  const handleLogout = () => {
    console.log("❌ Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // ✅ Authentication Component (Login / Signup)
  const AuthComponent = () => (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {showSignup ? (
        <SignupForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <LoginForm onAuthSuccess={handleAuthSuccess} />
      )}
      <button
        onClick={() => setShowSignup(!showSignup)}
        className="mt-4 text-blue-600 hover:underline font-semibold"
      >
        {showSignup ? "Already have an account? Log in" : "New user? Sign up"}
      </button>
    </div>
  );

  return { isAuthenticated, user, handleLogout, AuthComponent };
};

export default useAuthHandler;
