
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
