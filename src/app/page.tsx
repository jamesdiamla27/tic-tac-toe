"use client";

import React, { useState } from "react";

const emptyBoard = Array(3).fill(null).map(() => Array(3).fill(null));

function getWinner(board: string[][]) {
  // Rows, columns, diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  return null;
}

export default function Home() {
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const winner = getWinner(board);

  React.useEffect(() => {
    if (winner && !gameOver) {
      setScore((prev) => ({ ...prev, [winner]: prev[winner as "X" | "O"] + 1 }));
      setGameOver(true);
    } else if (!winner && board.flat().every(Boolean) && !gameOver) {
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
      setGameOver(true);
    }
  }, [winner, board, gameOver]);

  function handleClick(row: number, col: number) {
    if (board[row][col] || winner || gameOver) return;
    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? (xIsNext ? "X" : "O") : cell))
    );
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setGameOver(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6fa] text-[#222]">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      {/* Scoreboard */}
      <div className="flex gap-8 mb-8 p-4 rounded-2xl shadow" style={{ background: '#fff', boxShadow: '4px 4px 16px #e0e0e0, -4px -4px 16px #ffffff' }}>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Player X</span>
          <span className="text-2xl font-bold text-blue-600">{score.X}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Draws</span>
          <span className="text-2xl font-bold text-gray-500">{score.draws}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">Player O</span>
          <span className="text-2xl font-bold text-pink-600">{score.O}</span>
        </div>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-3 gap-6 p-6 rounded-3xl"
        style={{
          background: '#f5f6fa',
          boxShadow:
            "8px 8px 24px #e0e0e0, -8px -8px 24px #ffffff, inset 2px 2px 6px #e2e8f0, inset -2px -2px 6px #fff",
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-3xl font-bold rounded-2xl bg-[#fff] transition-all select-none hover:scale-105 focus:outline-none"
              style={{
                boxShadow:
                  "4px 4px 12px #e0e0e0, -4px -4px 12px #ffffff, inset 1px 1px 3px #e2e8f0, inset -1px -1px 3px #fff",
              }}
              onClick={() => handleClick(i, j)}
              aria-label={`Cell ${i + 1},${j + 1}`}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="mt-8 text-xl min-h-[2rem]">
        {winner
          ? `Winner: ${winner}`
          : board.flat().every(Boolean)
          ? "It's a draw!"
          : `Next: ${xIsNext ? "X" : "O"}`}
      </div>
      <button
        className="mt-6 px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
