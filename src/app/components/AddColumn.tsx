'use client';

import { useBoard } from "@/app/context/BoardContext";
import { useState } from "react";

export default function AddColumn() {
  const { addColumn } = useBoard();
  const [title, setTitle] = useState("");

  return (
    <div className="bg-gray-100 dark:bg-gray-700 shadow-inner rounded-lg p-4 w-72 flex-shrink-0">
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
          className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
          placeholder="Add column"
        />
      </form>
    </div>
  );
}
