import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ChatBox({ name }) {
  const navigate = useNavigate();

  return (
    <div className="chat-box" tabIndex={0} role="button" onClick={() => navigate('/chat')}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}>
        <div>
          <img
            src="https://avatar.iran.liara.run/public/35"
            alt="User profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        </div>
        <div>
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
