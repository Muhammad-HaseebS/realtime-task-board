'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

type Card = { id: string; title: string };
type Column = { id: string; title: string; cards: Card[] };
type BoardData = { columns: Column[] };

type ContextType = {
  columns: Column[];
  addCard: (columnId: string, title: string) => void;
  addColumn: (title: string) => void;
};

const BoardContext = createContext<ContextType | undefined>(undefined);
let socket: ReturnType<typeof useSocket> | null = null;

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([]);

  // 1. Initial SSR fetch
  useEffect(() => {
    fetch('/api/board')
      .then((res) => res.json())
      .then((data) => setColumns(data.columns));
  }, []);

  // 2. Real-time updates
  socket = useSocket((data: BoardData) => {
    setColumns(data.columns);
  });

  // 3. Local optimistic state update with rollback
  const optimisticUpdate = (next: Column[]) => {
    const prev = [...columns];
    setColumns(next);
    try {
      socket?.emit('board:update', { columns: next });
    } catch (e) {
      setColumns(prev);
    }
  };

  const addCard = (columnId: string, title: string) => {
    const next = columns.map((col) =>
      col.id === columnId
        ? { ...col, cards: [...col.cards, { id: Date.now().toString(), title }] }
        : col
    );
    optimisticUpdate(next);
  };

  const addColumn = (title: string) => {
    const next = [
      ...columns,
      { id: Date.now().toString(), title, cards: [] },
    ];
    optimisticUpdate(next);
  };

  return (
    <BoardContext.Provider value={{ columns, addCard, addColumn }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoard must be used inside provider');
  return ctx;
};
