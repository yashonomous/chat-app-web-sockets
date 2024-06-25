import { useContext } from 'react';
import UserContext from '../store/context/UserContext';
import ChatBox from './ChatBox';

const USERS = ['User1', 'User2'];

function ChatSidebar() {
  const { user } = useContext(UserContext);

  return (
    <div className="chat-sidebar">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <h2>Chats</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
          <ChatBox name={USERS.filter((u) => u !== user)[0]} />
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;
