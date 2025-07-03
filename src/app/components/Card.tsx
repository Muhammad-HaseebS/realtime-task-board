'use client';

import { useState } from "react";
import { useBoard } from "@/app/context/BoardContext";
import { LuPencil, LuTrash2 } from "react-icons/lu"; 

type CardProps = {
  title: string;
  id: string;
};

export default function Card({ title, id }: CardProps) {
  const { editCard, deleteCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(title);

  return (
    <div
      className="bg-gray-100  p-3 rounded shadow-sm hover:shadow-md transition duration-200 text-sm text-gray-800 flex justify-between items-center"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editCard(id, input);
            setIsEditing(false);
          }}
          className="flex-grow"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm"
          />
        </form>
      ) : (
        <span className="flex-grow">{title}</span>
      )}
      <div className="ml-2 flex gap-1 items-center">
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 hover:text-blue-800">
          <LuPencil size={16} />
        </button>
        <button onClick={() => deleteCard(id)} className="text-red-600 hover:text-red-800">
          <LuTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
