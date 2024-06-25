import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../store/context/UserContext';

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleUserSelect = (user) => {
    setUser(user);
    navigate('/chat');
  };

  return user ? (
    <Navigate to={'/chat'} />
  ) : (
    <div className="login-container">
      <button onClick={() => handleUserSelect('User1')}>Login as User1</button>
      <button onClick={() => handleUserSelect('User2')}>Login as User2</button>
    </div>
  );
}
export default Login;
