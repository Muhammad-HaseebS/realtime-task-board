'use client'
import React, { createContext, useContext, useState } from "react";

type Card = { id: string; title: string };
type Column = { id: string; title: string; cards: Card[] };

type BoardContextType = {
  columns: Column[];
  addColumn: (title: string) => void;
  addCard: (columnId: string, title: string) => void;
  editCard: (cardId: string, newTitle: string) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, targetColumnId: string) => void;
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

  const editCard = (cardId: string, newTitle: string) => {
    setColumns(cols =>
      cols.map(col => ({
        ...col,
        cards: col.cards.map(card =>
          card.id === cardId ? { ...card, title: newTitle } : card
        ),
      }))
    );
  };

  const deleteCard = (cardId: string) => {
    setColumns(cols =>
      cols.map(col => ({
        ...col,
        cards: col.cards.filter(card => card.id !== cardId),
      }))
    );
  };

  const moveCard = (cardId: string, targetColumnId: string) => {
    let movedCard: Card | null = null;

    const newColumns = columns.map(col => {
      const cardIndex = col.cards.findIndex(card => card.id === cardId);
      if (cardIndex > -1) {
        movedCard = col.cards[cardIndex];
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== cardId),
        };
      }
      return col;
    });

    if (movedCard) {
      setColumns(
        newColumns.map(col =>
          col.id === targetColumnId
            ? { ...col, cards: [...col.cards, movedCard!] }
            : col
        )
      );
    }
  };

  return (
    <BoardContext.Provider value={{ columns, addColumn, addCard, editCard, deleteCard, moveCard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
};
