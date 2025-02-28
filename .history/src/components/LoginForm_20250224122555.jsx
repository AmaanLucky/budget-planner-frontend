import { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../api/authApi";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = ({ onAuthSuccess, onToggle }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = await login(formData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } else {
      setError("❌ Login failed! Check credentials.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-5">Welcome Back!</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all"
        >
          Log In
        </button>
      </form>

      {/* Don't have an account? Switch to Signup */}
      <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
        Don&apos;t have an account?{" "}
        <button onClick={onToggle} className="text-blue-600 hover:underline font-semibold">
          Sign Up
        </button>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired, // ✅ Added Toggle Prop for Switching Forms
};

export default LoginForm;