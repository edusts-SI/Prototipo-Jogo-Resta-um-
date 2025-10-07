
import React, { useState, useEffect, useCallback } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { BoardLayout, CellState, Position } from '../types';
import { INITIAL_BOARD, TOTAL_PEGS_START } from '../constants';

type GameStatus = 'playing' | 'won' | 'lost';

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardLayout>(INITIAL_BOARD);
  const [selectedPeg, setSelectedPeg] = useState<Position | null>(null);
  const [pegCount, setPegCount] = useState<number>(TOTAL_PEGS_START);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  
  const isValidMove = useCallback((from: Position, to: Position, currentBoard: BoardLayout): boolean => {
    if (to.row < 0 || to.row >= currentBoard.length || to.col < 0 || to.col >= currentBoard[0].length) {
      return false; // Out of bounds
    }

    if (currentBoard[to.row][to.col] !== CellState.Empty) {
      return false; // Destination is not empty
    }

    const dRow = to.row - from.row;
    const dCol = to.col - from.col;

    // Must be a jump of 2 spaces, either horizontally or vertically
    if (!((Math.abs(dRow) === 2 && dCol === 0) || (dRow === 0 && Math.abs(dCol) === 2))) {
      return false;
    }

    const jumpedPegRow = from.row + dRow / 2;
    const jumpedPegCol = from.col + dCol / 2;

    // The jumped position must contain a peg
    return currentBoard[jumpedPegRow][jumpedPegCol] === CellState.Peg;
  }, []);
  
  const hasAnyValidMove = useCallback((currentBoard: BoardLayout): boolean => {
    for (let r = 0; r < currentBoard.length; r++) {
      for (let c = 0; c < currentBoard[r].length; c++) {
        if (currentBoard[r][c] === CellState.Peg) {
          // Check 4 possible jump destinations
          const destinations: Position[] = [
            { row: r - 2, col: c },
            { row: r + 2, col: c },
            { row: r, col: c - 2 },
            { row: r, col: c + 2 },
          ];
          for (const dest of destinations) {
            if (isValidMove({ row: r, col: c }, dest, currentBoard)) {
              return true; // Found at least one valid move
            }
          }
        }
      }
    }
    return false; // No valid moves found
  }, [isValidMove]);

  useEffect(() => {
    if (pegCount <= 1) {
      setGameStatus('won');
    } else if (!hasAnyValidMove(board)) {
      setGameStatus('lost');
    } else {
      setGameStatus('playing');
    }
  }, [pegCount, board, hasAnyValidMove]);

  const handleCellClick = (row: number, col: number) => {
    if (gameStatus !== 'playing') return;

    const cellState = board[row][col];
    
    if (selectedPeg) {
      if (isValidMove(selectedPeg, { row, col }, board)) {
        // Perform the move
        const newBoard = board.map(r => [...r]);
        newBoard[selectedPeg.row][selectedPeg.col] = CellState.Empty;
        newBoard[row][col] = CellState.Peg;
        const jumpedPegRow = selectedPeg.row + (row - selectedPeg.row) / 2;
        const jumpedPegCol = selectedPeg.col + (col - selectedPeg.col) / 2;
        newBoard[jumpedPegRow][jumpedPegCol] = CellState.Empty;
        
        setBoard(newBoard);
        setPegCount(prev => prev - 1);
        setSelectedPeg(null);
      } else {
        // Deselect or select another peg
        setSelectedPeg(cellState === CellState.Peg ? { row, col } : null);
      }
    } else {
      if (cellState === CellState.Peg) {
        setSelectedPeg({ row, col });
      }
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setPegCount(TOTAL_PEGS_START);
    setSelectedPeg(null);
    setGameStatus('playing');
  };

  const getGameStatusMessage = () => {
    if (gameStatus === 'won') {
      const isPerfect = pegCount === 1 && board[3][3] === CellState.Peg;
      return isPerfect ? 'Vitória Perfeita! Você é um gênio!' : 'Você Venceu! Ótimo trabalho!';
    }
    if (gameStatus === 'lost') {
      return 'Fim de Jogo! Não há mais movimentos.';
    }
    return 'Clique na peça que você quer mover e depois no espaço vazio para onde ela vai saltar.';
  };

  return (
    <SectionWrapper title="Chega de Teoria. É Hora do Desafio!">
      <div className="flex flex-col items-center">
        <div className="mb-4 p-4 rounded-lg bg-gray-800 w-full max-w-md text-center">
          <p className={`text-lg font-semibold ${gameStatus === 'won' ? 'text-teal-400' : gameStatus === 'lost' ? 'text-amber-400' : 'text-gray-300'}`}>
            {getGameStatusMessage()}
          </p>
        </div>

        <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-2xl border border-gray-700">
          {board.map((row, rIdx) => (
            <div key={rIdx} className="flex">
              {row.map((cell, cIdx) => (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center"
                  onClick={() => cell !== CellState.Invalid && handleCellClick(rIdx, cIdx)}
                >
                  {cell !== CellState.Invalid && (
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 ${cell !== CellState.Empty ? 'cursor-pointer' : 'cursor-default'}`}>
                      {cell === CellState.Peg && (
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-teal-400 shadow-md transition-all duration-200 ${selectedPeg?.row === rIdx && selectedPeg?.col === cIdx ? 'ring-4 ring-offset-2 ring-offset-gray-800 ring-blue-500 scale-110' : 'hover:bg-teal-300'}`}></div>
                      )}
                      {cell === CellState.Empty && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-700 hover:bg-gray-600"></div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
           <div className="text-xl font-bold bg-gray-800 px-6 py-3 rounded-lg w-full sm:w-auto text-center">
            Peças Restantes: <span className="text-teal-400">{pegCount}</span>
          </div>
          <button
            onClick={resetGame}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Reiniciar Jogo
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const GameSection = GameBoard;
