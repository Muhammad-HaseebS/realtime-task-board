'use client';

import Board from "@/app/components/Board";
import { BoardProvider } from "@/app/context/BoardContext";

export default function Home() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-4">Task Board</h1>
        <Board />
      </div>
    </BoardProvider>
  );
}
