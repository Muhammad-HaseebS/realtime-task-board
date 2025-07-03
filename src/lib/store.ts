import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'board.json');

// Initial board template
const initialData = {
  columns: [
    { id: 'todo', title: 'To Do', cards: [] },
    { id: 'inprogress', title: 'In Progress', cards: [] },
    { id: 'done', title: 'Done', cards: [] },
  ],
};

export const getBoard = () => {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  } catch {
    saveBoard(initialData);
    return initialData;
  }
};

export const saveBoard = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const updateBoard = (data: any) => {
  saveBoard(data);
};
