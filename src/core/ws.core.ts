import { http } from './http.core';
import { Server, Socket } from 'socket.io';
import { Express } from 'express';


const io = new Server(http, {
  cors: { origin: '*' }
});

let interval: number;

function WebSocket(app: Express) {
  io.on('connection', (socket: Socket) => {
    console.log(`[socket]: ${socket.id} is connected`);
    socket.on('disconnect', () => {
      clearInterval(interval);
    });
  });

  app.set('socketIo', io);

  console.log("[socket]: SocketIO is initialized")
}

export default WebSocket;
