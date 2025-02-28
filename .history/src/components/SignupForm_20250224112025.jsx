import { useState } from "react";
import PropTypes from "prop-types"
import { signup } from "../api/authApi";

const SignupForm = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(formData);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      onAuthSuccess();
    } else {
      setError("Signup failed! Try again.");
    }
  };

  return (
    <div className="p-6 shadow-md rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;