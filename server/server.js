const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 3001;
const messagesFilePath = path.join(__dirname, 'messages.json');

app.get('/', (req, res) => {
  res.send('Express server is running');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const connections = {};
const users = {};

const handleClose = (username) => {
  console.log(`${username} disconnected`);
  delete connections[username];
  broadcast();
};

const broadcast = (message) => {
  Object.keys(connections).forEach((client) => {
    const connection = connections[client];
    connection.send(message);
  });
};

wss.on('connection', (connection, request) => {
  const { username } = url.parse(request.url, true).query;
  console.log(`${username} connected`);
  connections[username] = connection;

  const messages = fs.readFileSync(messagesFilePath, 'utf8');
  broadcast(
    JSON.stringify({
      type: 'INITIAL_MESSAGES',
      data: JSON.parse(messages),
    })
  );

  connection.on('message', (message) => {
    const messageData = JSON.parse(message);
    const messages = fs.readFileSync(messagesFilePath, 'utf8');
    const currentMessages = JSON.parse(messages);
    const finalMessages = [messageData, ...currentMessages];

    try {
      fs.writeFileSync(messagesFilePath, JSON.stringify(finalMessages, null, 2));
    } catch (err) {
      console.error(err);
    }

    broadcast(
      JSON.stringify({
        type: 'NEW_MESSAGE',
        data: messageData,
      })
    );
  });

  connection.on('close', () => handleClose(username));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
