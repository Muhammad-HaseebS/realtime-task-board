import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function AddColumn() {
  const { addColumn } = useBoard();
  const [title, setTitle] = useState("");

  return (
    <div className="bg-gray-200 rounded-lg p-4 w-64">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) {
            addColumn(title);
            setTitle("");
          }
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded text-black placeholder-gray-500"
          placeholder="Add column"
        />
      </form>
    </div>
  );
}
