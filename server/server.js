const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { saveMessage } = require('./../app/controllers/messageController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

// Connect to the database using Prisma


// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', async (message) => {
    // Emit the message to all connected clients
    io.emit('message', message);

    // Save the message to the database
    try {
      const savedMessage = await saveMessage(message);
      console.log('Message saved to the database:', savedMessage);
    } catch (error) {
      console.error('Error saving message to the database:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
