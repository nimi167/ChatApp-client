// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormInput } from '../hooks/useFormInput';
import { handleLoginSubmit } from '../utils/handleLoginSubmit';
import FormInput from './FormInput'; // Import the FormInput component
import '../Login.css';

const Login = () => {
  const navigate = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(username.value, password.value, navigate, setError);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <FormInput label="Username" type="text" inputProps={username} />
        <FormInput label="Password" type="password" inputProps={password} />
        <button type="submit">Login</button>
        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;