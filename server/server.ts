import http from 'http';
import express from 'express';
import { Server } from "socket.io"
import cors from 'cors';
import dotenv from 'dotenv';



const app = express();
dotenv.config();
app.use(cors())



const port = process.env.PORT || 5000;

const server = http.createServer(app)

const io = new Server(server, 
{
    cors: { origin: "*" }
})

io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data.room);
    })

    
    socket.on('send_msg', (data) => {
        socket.to(data.room).emit('receive_msg', data.msg);
    })

});

server.listen(port, () => {
    console.log("Server is running on port " + port);
})