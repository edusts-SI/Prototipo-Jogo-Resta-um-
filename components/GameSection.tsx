
import React, { useState, useEffect, useCallback } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { BoardLayout, CellState, Position, GameRecord } from '../types';
import { INITIAL_BOARD, TOTAL_PEGS_START } from '../constants';

type GameStatus = 'playing' | 'won' | 'lost';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const GameBoard: React.FC = () => {
  // Game State
  const [board, setBoard] = useState<BoardLayout>(INITIAL_BOARD);
  const [selectedPeg, setSelectedPeg] = useState<Position | null>(null);
  const [pegCount, setPegCount] = useState<number>(TOTAL_PEGS_START);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  
  // Timer & Records State
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>('');
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [showSaveForm, setShowSaveForm] = useState<boolean>(false);

  // Load records from LocalStorage on mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('restaUmRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (isTimerRunning && gameStatus === 'playing') {
      interval = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameStatus]);

  // Movement Logic
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
          const destinations: Position[] = [
            { row: r - 2, col: c },
            { row: r + 2, col: c },
            { row: r, col: c - 2 },
            { row: r, col: c + 2 },
          ];
          for (const dest of destinations) {
            if (isValidMove({ row: r, col: c }, dest, currentBoard)) {
              return true; 
            }
          }
        }
      }
    }
    return false; 
  }, [isValidMove]);

  // Game Status Check
  useEffect(() => {
    if (pegCount <= 1) {
      setGameStatus('won');
      setIsTimerRunning(false);
      setShowSaveForm(true);
    } else if (!hasAnyValidMove(board)) {
      setGameStatus('lost');
      setIsTimerRunning(false);
    } else {
      // Game is continuing
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
    setTimeElapsed(0);
    setIsTimerRunning(true);
    setShowSaveForm(false);
    setPlayerName('');
  };

  const saveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const newRecord: GameRecord = {
      id: Date.now().toString(),
      name: playerName.trim(),
      timeInSeconds: timeElapsed,
      date: new Date().toLocaleDateString('pt-BR')
    };

    // Add new record, sort by time (ascending), take top 10
    const updatedRecords = [...records, newRecord]
      .sort((a, b) => a.timeInSeconds - b.timeInSeconds)
      .slice(0, 10); // Keep top 10

    setRecords(updatedRecords);
    localStorage.setItem('restaUmRecords', JSON.stringify(updatedRecords));
    setShowSaveForm(false);
  };

  const getGameStatusMessage = () => {
    if (gameStatus === 'won') {
      return 'Vitória! Você completou o desafio.';
    }
    if (gameStatus === 'lost') {
      return 'Fim de Jogo! Não há mais movimentos.';
    }
    return 'Clique na peça para selecionar e no espaço vazio para saltar.';
  };

  return (
    <SectionWrapper title="Hora do Desafio!">
      <div className="flex flex-col items-center gap-6">
        
        {/* Header with Timer and Count */}
        <div className="flex flex-row justify-between items-center w-full max-w-md bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Peças</span>
            <span className="text-2xl font-mono font-bold text-teal-400">{pegCount}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Tempo</span>
            <span className={`text-2xl font-mono font-bold ${isTimerRunning ? 'text-white' : gameStatus === 'won' ? 'text-green-400' : 'text-red-400'}`}>
              {formatTime(timeElapsed)}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div className="w-full max-w-md text-center">
          <p className={`text-lg font-semibold ${gameStatus === 'won' ? 'text-green-400' : gameStatus === 'lost' ? 'text-amber-400' : 'text-gray-300'}`}>
            {getGameStatusMessage()}
          </p>
        </div>

        {/* Victory Form - Shows only when won and not saved yet */}
        {showSaveForm && (
          <form onSubmit={saveRecord} className="w-full max-w-md bg-gradient-to-br from-teal-900 to-gray-800 p-6 rounded-xl border border-teal-500/50 shadow-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-2">Novo Recorde! 🏆</h3>
            <p className="text-gray-300 mb-4">Você terminou em <span className="font-bold text-white">{formatTime(timeElapsed)}</span>.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Digite seu nome"
                className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={20}
                autoFocus
                required
              />
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        {/* Game Board */}
        <div className="bg-gray-800 p-2 sm:p-4 rounded-xl shadow-2xl border border-gray-700 relative">
           {/* Overlay disabled state if game over */}
           {gameStatus !== 'playing' && !showSaveForm && (
             <div className="absolute inset-0 z-10 bg-gray-900/20 rounded-xl pointer-events-none"></div>
           )}
           
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

        {/* Controls */}
        <button
          onClick={resetGame}
          className="w-full max-w-md px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
        >
          {gameStatus === 'playing' ? 'Reiniciar Jogo' : 'Jogar Novamente'}
        </button>

        {/* Hall of Fame / Records */}
        {records.length > 0 && (
          <div className="w-full max-w-md mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.699-3.181a1 1 0 011.827 1.035l-1.155 2.156A8.99 8.99 0 0118 8v8a1 1 0 11-2 0V9.414l-2.121 2.122a1 1 0 000 1.414 1 1 0 001.414 0l2.829-2.829a1 1 0 00-1.415-1.414L15.32 10.12A6.974 6.974 0 0014 6.315V16a3 3 0 11-6 0V6.315a6.974 6.974 0 00-1.32 3.805l1.393-1.393a1 1 0 10-1.414 1.414l2.828 2.829a1 1 0 001.414 0 1 1 0 000-1.414l-2.121-2.122V16a1 1 0 11-2 0V8c0-1.636.425-3.166 1.16-4.506l-1.155-2.156a1 1 0 011.827-1.035L8 5.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Hall da Fama
            </h3>
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-700 text-gray-200 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Nome</th>
                    <th className="px-4 py-3 text-right">Tempo</th>
                    <th className="px-4 py-3 text-right">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {records.map((record, index) => (
                    <tr key={record.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3 font-mono text-teal-500 font-bold">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-white">{record.name}</td>
                      <td className="px-4 py-3 text-right font-mono text-gray-300">{formatTime(record.timeInSeconds)}</td>
                      <td className="px-4 py-3 text-right text-xs">{record.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export const GameSection = GameBoard;
