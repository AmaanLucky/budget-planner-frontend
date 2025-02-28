import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const useAuthHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    console.log(`🔄 Auth State Updated: ${isAuthenticated ? "Authenticated ✅" : "Not Authenticated ❌"}`);
  }, [isAuthenticated]);

  // ✅ Handle Login & Signup Success
  const handleAuthSuccess = (token) => {
    console.log("🔹 Storing Token:", token); // Debugging
    localStorage.setItem("token", token); // ✅ Store actual token
    setIsAuthenticated(true);
};

  // ✅ Logout Function
  const handleLogout = () => {
    console.log("❌ Logging out...");
    localStorage.removeItem("token");
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

  return { isAuthenticated, handleLogout, AuthComponent };
};

export default useAuthHandler;