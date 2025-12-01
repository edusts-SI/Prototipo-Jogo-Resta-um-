
export enum CellState {
  Empty = 0,
  Peg = 1,
  Invalid = 2,
}

export type BoardLayout = CellState[][];

export interface Position {
  row: number;
  col: number;
}

export interface GameRecord {
  id: string;
  name: string;
  timeInSeconds: number;
  date: string;
}
