import { Server } from 'socket.io';
import { getBoard, updateBoard } from '@/lib/store';

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('🟢 Client connected');
      socket.emit('board:init', getBoard());

      socket.on('board:update', (data) => {
        updateBoard(data);
        socket.broadcast.emit('board:sync', data);
      });

      socket.on('disconnect', () => {
        console.log('🔴 Client disconnected');
      });
    });
  }
  res.end();
}
