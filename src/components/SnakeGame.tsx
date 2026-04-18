import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState, Point } from '../types';
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [nextDirection, setNextDirection] = useState<Point>({ x: 0, y: -1 });
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, []);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
    setDirection({ x: 0, y: -1 });
    setNextDirection({ x: 0, y: -1 });
    setScore(0);
    onScoreChange(0);
    setSpeed(INITIAL_SPEED);
    setGameState(GameState.PLAYING);
    generateFood([{ x: 10, y: 10 }]);
  };

  const gameOver = useCallback(() => {
    setGameState(GameState.GAME_OVER);
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + nextDirection.x,
        y: head.y + nextDirection.y,
      };

      setDirection(nextDirection);

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        gameOver();
        return prevSnake;
      }

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        const nextScore = score + 10;
        setScore(nextScore);
        onScoreChange(nextScore);
        setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [nextDirection, food, score, generateFood, gameOver, onScoreChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [gameState, speed, moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#ff00ff' : '#00ffff';
      
      const padding = index === 0 ? 0 : 2;
      ctx.fillRect(
        segment.x * cellSize + padding,
        segment.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2
      );

      if (isHead) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          segment.x * cellSize,
          segment.y * cellSize,
          cellSize,
          cellSize
        );
      }
    });

    ctx.fillStyle = '#ffff00';
    ctx.fillRect(
      food.x * cellSize + 4,
      food.y * cellSize + 4,
      cellSize - 8,
      cellSize - 8
    );

  }, [snake, food]);

  return (
    <div className="relative tear-container">
      <div className="relative bg-black border-4 border-cyan-400 p-1 shadow-[8px_8px_0_#ff00ff]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block"
        />

        <AnimatePresence>
          {gameState !== GameState.PLAYING && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center"
            >
              {gameState === GameState.IDLE ? (
                <div className="space-y-8 tear-effect">
                  <h2 className="text-4xl font-pixel glitch-text tracking-tighter text-white">
                    NEURAL_LINK
                  </h2>
                  <p className="font-mono text-cyan-400 text-sm">
                    {`[STATUS: DISCONNECTED]`}
                    <br />
                    {`[ACTION: INIT_SEQUENCE]`}
                  </p>
                  <button
                    onClick={startGame}
                    className="pixel-button px-8 py-4 text-sm"
                  >
                    SYNC_NOW
                  </button>
                </div>
              ) : (
                <div className="space-y-8 tear-effect">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-pixel glitch-text text-magenta-500">
                      CRITICAL_ERR
                    </h2>
                    <p className="font-mono text-yellow-400">DATA_LEAK: {score}</p>
                  </div>

                  <button
                    onClick={startGame}
                    className="pixel-button px-8 py-4 text-sm bg-magenta-500 text-white"
                  >
                    REBOOT
                  </button>

                  <div className="text-[10px] font-mono text-cyan-700 mt-4">
                    MAX_FREQ_STABILITY: {highScore}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-magenta-500 tracking-tighter">
        <div>CORE_PROC: ACTIVE</div>
        <div>BUFFER: {score}KB // SCALE: 1:1</div>
      </div>
    </div>
  );
};
