const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());


// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', async (messages) => {
    // Emit the message to all connected clients
    io.emit('message', messages);
    console.log(messages);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
