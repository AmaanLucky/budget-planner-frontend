import { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../api/authApi";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

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
      onAuthSuccess(data.token, data.user);
    } else {
      setError("❌ Login failed! Check credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {/* ✅ Project Logo (Updated for better visibility) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img src="/logo.svg" alt="Project Logo" className="w-20 h-20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back!
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-400 dark:text-gray-300 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-12 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-400 dark:text-gray-300 text-lg" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-12 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <button onClick={onToggle} className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

LoginForm.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default LoginForm;
