'use client';

import Board from "@/app/components/Board";
import { BoardProvider } from "@/app/context/BoardContext";

export default function Home() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 text-white">
        <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)]">
          <h1 className="text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-lg">
            ⚡ Real-Time Collaborative Task Board
          </h1>
          <Board />
        </div>
      </div>
    </BoardProvider>
  );
}
