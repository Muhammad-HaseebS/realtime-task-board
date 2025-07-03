'use client'
import React, { createContext, useContext, useState } from "react";

type Card = { id: string; title: string };
type Column = { id: string; title: string; cards: Card[] };

type BoardContextType = {
  columns: Column[];
  addColumn: (title: string) => void;
  addCard: (columnId: string, title: string) => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", cards: [] },
    { id: "inprogress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]);

  const addColumn = (title: string) => {
    setColumns([...columns, { id: Date.now().toString(), title, cards: [] }]);
  };

  const addCard = (columnId: string, title: string) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, cards: [...col.cards, { id: Date.now().toString(), title }] }
        : col
    ));
  };

  return (
    <BoardContext.Provider value={{ columns, addColumn, addCard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
};
