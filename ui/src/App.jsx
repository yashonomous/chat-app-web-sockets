import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import RequireLogin from './components/RequireLogin';
import { UserProvider } from './store/provider/UserProvider';

function App() {
  return (
    <Router>
      <div className="app">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/chat"
              element={
                <RequireLogin>
                  <ChatSidebar />
                  <ChatWindow />
                </RequireLogin>
              }
            />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
