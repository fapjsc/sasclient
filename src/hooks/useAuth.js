// Hook (use-auth.js)
import { useState, useContext, createContext } from 'react';
import { useSelector } from 'react-redux';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};
export const useProvideAuth = () => {
  const { user } = useSelector(state => state);

  //   const [user, setUser] = useState(null);

  // Return the user object and auth methods
  return {
    user,
  };
};
