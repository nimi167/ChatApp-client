// src/utils/handleSignupSubmit.js
import { register } from '../services/authService';

export const handleSignupSubmit = async (username, password, navigate, setError) => {
  setError('');
  try {
    await register(username, password);
    navigate('/login');
  } catch (error) {
    setError('Signup failed. Please try again.');
    console.error("Signup failed:", error);
  }
};
