
import { BoardLayout, CellState } from './types';

// Coloque aqui a URL do seu Web App do Google Apps Script para ativar o Ranking Global.
// Exemplo: "https://script.google.com/macros/s/AKfycbx.../exec"
export const LEADERBOARD_API_URL = "https://script.google.com/macros/s/AKfycbyJEC_owht3bdHk-DN_BQgveawk7rgSOpCGbd_e34jnOQrPh5s9NifH4UTcu676tCZ5QQ/exec"; 

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
