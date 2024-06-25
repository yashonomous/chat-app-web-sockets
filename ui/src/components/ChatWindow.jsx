import { useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import UserContext from '../store/context/UserContext';

function ChatWindow() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket('ws://localhost:3001', {
    share: false,
    shouldReconnect: () => true,
    queryParams: { username: user },
  });

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log('Connection state changed');
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.type === 'INITIAL_MESSAGES') {
        setMessages(lastJsonMessage.data);
      } else if (lastJsonMessage.type === 'NEW_MESSAGE') {
        setMessages((prevMessages) => [lastJsonMessage.data, ...prevMessages]);
      }
    }
  }, [lastJsonMessage]);

  const sendMessage = (e) => {
    e.preventDefault();

    const messageData = {
      sender: user,
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };

    sendJsonMessage(messageData);
    setInputText('');

    // setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  return (
    <div className="chat-window">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user ? 'sent' : 'received'}`}>
            <span>{msg.text}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <form className="message-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
