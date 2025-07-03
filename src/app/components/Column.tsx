
import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function Column({ column }: { column: any }) {
  const { addCard } = useBoard();
  const [title, setTitle] = useState("");

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64">
      <h2 className="font-bold mb-2">{column.title}</h2>
      <div className="space-y-2 mb-2">
        {column.cards.map((card: any) => (
          <div key={card.id} className="bg-white p-2 rounded shadow">
            {card.title}
          </div>
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
          className="w-full px-2 py-1 border rounded"
          placeholder="Add card"
        />
      </form>
    </div>
  );
}
