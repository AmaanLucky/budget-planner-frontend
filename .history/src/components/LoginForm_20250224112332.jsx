import { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../api/authApi";

const LoginForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(formData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } else {
      setError("Login failed! Check credentials.");
    }
  };

  return (
    <div className="p-6 shadow-md rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;