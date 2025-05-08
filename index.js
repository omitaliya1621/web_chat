const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('user-message', ({ username, message }) => {
        socket.broadcast.emit('res', { username, message });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(process.env.PORT || 8000, '0.0.0.0', () => {
    console.log('Server running at http://localhost:8000');
});
