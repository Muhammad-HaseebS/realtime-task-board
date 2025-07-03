'use client';

import { useBoard } from "@/app/context/BoardContext";
import Column from "./Column";
import AddColumn from "./AddColumn";

export default function Board() {
  const { columns } = useBoard();

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-2 sm:px-4 py-4 min-w-fit">
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
        <AddColumn />
      </div>
    </div>
  );
}
