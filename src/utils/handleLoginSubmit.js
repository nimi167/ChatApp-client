// src/utils/handleLoginSubmit.js
import { login } from '../services/authService';

export const handleLoginSubmit = async (username, password, navigate, setError) => {
  setError(''); // Reset error message

  try {
    const data = await login(username, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', username);
    navigate('/chat');
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        setError('Invalid username or password.');
      } else if (error.response.status === 500) {
        setError('Internal server error. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } else {
      setError('Network error. Please check your connection.');
    }
  }
};
