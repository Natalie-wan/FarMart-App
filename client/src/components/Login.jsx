import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Use the loginUser service
      const data = await loginUser(formData); // Call loginUser

      // Handle success (for now just log and redirect)
      console.log('Login successful:', data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message); // Handle error
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Welcome Back</h2>
        {error && <div className="error">{error}</div>}

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Login
        </button>

        <p className="redirect">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
