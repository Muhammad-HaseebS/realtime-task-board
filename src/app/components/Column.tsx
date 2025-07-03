'use client';

import { useBoard } from "@/app/context/BoardContext";
import { useState } from "react";
import Card from "./Card";

type CardType = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

export default function Column({ column }: { column: ColumnType }) {
  const { addCard, moveCard } = useBoard();
  const [title, setTitle] = useState("");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    moveCard(cardId, column.id);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 w-72 flex-shrink-0"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="font-semibold text-lg mb-3 text-gray-800">{column.title}</h2>

      <div className="space-y-2 mb-4">
        {column.cards.map((card) => (
          <Card key={card.id} title={card.title} id={card.id} />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) {
            addCard(column.id, title);
            setTitle("");
          }
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
          placeholder="Add card"
        />
      </form>
    </div>
  );
}
