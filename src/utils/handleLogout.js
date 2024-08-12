// src/utils/handleLogout.js

export const handleLogout = async (navigate) => {

  try {
    localStorage.clear();
    navigate('/');
  } catch (error) {
        console.log(error)
  }
};
