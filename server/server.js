const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

io.on('connection', (socket) => {
  `User connected ${socket.id}`

  socket.on('join', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation ${conversationId}`);
  });

  socket.on('message', async (message) => {
    const { reciverId, conversationId } = message;
    const roomInfo = socket.adapter.rooms.get(conversationId);
    const isInRoom = roomInfo && roomInfo.has(socket.id);
  console.log(roomInfo);
    if (isInRoom) {
      io.to(reciverId).emit('message', message);
      console.log(`Message sent to ${reciverId} in conversation ${conversationId}`);
    } else {
      console.log(`Receiver ${reciverId} not found in conversation ${conversationId}`);
    }
  });

  socket.on('disconnecting', () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      console.log(`User disconnected from room ${room}`);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
