const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (typingState) => {
    socket.broadcast.emit('getTypingStatus', typingState);
  });
});

httpServer.listen(4000, () => {
  console.log('listening on *:4000');
});
