
import { BoardLayout, CellState } from './types';

export const INITIAL_BOARD: BoardLayout = [
  [CellState.Invalid, CellState.Invalid, CellState.Peg, CellState.Peg, CellState.Peg, CellState.Invalid, CellState.Invalid],
  [CellState.Invalid, CellState.Invalid, CellState.Peg, CellState.Peg, CellState.Peg, CellState.Invalid, CellState.Invalid],
  [CellState.Peg,     CellState.Peg,     CellState.Peg, CellState.Peg, CellState.Peg, CellState.Peg,     CellState.Peg],
  [CellState.Peg,     CellState.Peg,     CellState.Peg, CellState.Empty, CellState.Peg, CellState.Peg,     CellState.Peg],
  [CellState.Peg,     CellState.Peg,     CellState.Peg, CellState.Peg, CellState.Peg, CellState.Peg,     CellState.Peg],
  [CellState.Invalid, CellState.Invalid, CellState.Peg, CellState.Peg, CellState.Peg, CellState.Invalid, CellState.Invalid],
  [CellState.Invalid, CellState.Invalid, CellState.Peg, CellState.Peg, CellState.Peg, CellState.Invalid, CellState.Invalid],
];

export const TOTAL_PEGS_START = 32;
