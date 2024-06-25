import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../store/context/UserContext';

// eslint-disable-next-line react/prop-types
function RequireLogin({ children }) {
  const { user } = useContext(UserContext);

  return !user ? <Navigate to={'/'} /> : children;
}

export default RequireLogin;
