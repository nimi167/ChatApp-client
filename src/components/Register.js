
// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormInput } from '../hooks/useFormInput'; // Import the custom hook
import { handleSignupSubmit } from '../utils/handleSignupSubmit'; // Import the handleSignupSubmit function
import FormInput from './FormInput'; // Import the FormInput component
import '../Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignupSubmit(username.value, password.value, navigate, setError);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Signup</h2>
        {error && <div className="error-message">{error}</div>}
        <FormInput label="Username" type="text" inputProps={username} />
        <FormInput label="Password" type="password" inputProps={password} />
        <button type="submit">Signup</button>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;