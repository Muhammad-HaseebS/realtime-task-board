import { useBoard } from "../context/BoardContext";
import AddColumn from "./AddColumn";
import Column from "./Column";


export default function Board() {
  const { columns } = useBoard();

  return (
    <div className="flex p-4 space-x-4 overflow-x-auto">
      {columns.map(col => (
        <Column key={col.id} column={col} />
      ))}
      <AddColumn />
    </div>
  );
}
