const express = require('express');
const app = express();
const http = require('http');
const PORT = 3001;
const cors = require('cors');
const { Server, Socket } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection" , (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with Id : ${socket.id} Joined Room: ${data}`);
    });

    socket.on("send_message", (data) => {
       socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", ()=> {
        console.log('User Disconnect', socket.id);
    });
});



server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})