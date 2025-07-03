import { NextResponse } from 'next/server';
import { getBoard } from '@/lib/store';

export async function GET() {
  const board = getBoard();
  return NextResponse.json(board);
}
