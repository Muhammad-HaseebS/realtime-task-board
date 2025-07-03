'use client';

import { useEffect, useRef } from 'react';
import  io  from 'socket.io-client';

type BoardData = {
  columns: {
    id: string;
    title: string;
    cards: { id: string; title: string }[];
  }[];
};

export const useSocket = (onBoardSync: (data: BoardData) => void) => {
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const socket = io('', { path: '/api/socketio' });
    socketRef.current = socket;

    socket.on('connect', () => console.log('🧩 Socket connected'));
    socket.on('board:init', onBoardSync);
    socket.on('board:sync', onBoardSync);
    socket.on('disconnect', () => console.warn('🚫 Socket disconnected'));

    return () => {
      socket.disconnect();
    };
  }, [onBoardSync]);

  return socketRef.current;
};
