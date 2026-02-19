'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Circle } from 'lucide-react';

/* ================= BACKGROUND HEARTS ================= */

const BackgroundHearts = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: '110vh',
            x: `${i * 10}%`,
            scale: 0.5
          }}
          animate={{
            opacity: [0, 0.2, 0],
            y: '-10vh',
            rotate: [0, 180],
            scale: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear'
          }}
          className="absolute text-red-500/10"
        >
          <Heart size={30} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

/* ================= STEP 1 ================= */

const LoveModeStep = ({ onComplete }: { onComplete: () => void }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOn, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center space-y-8"
    >
      <Heart
        className={`w-24 h-24 transition-all duration-700 ${
          isOn ? 'text-red-500 fill-red-500 scale-110' : 'text-white/20'
        }`}
      />

      <button
        onClick={() => setIsOn(true)}
        className="px-6 py-3 bg-red-500 text-white rounded-xl text-lg"
      >
        Turn Love Mode On ❤️
      </button>
    </motion.div>
  );
};

/* ================= STEP 2 ================= */

const TicTacToeStep = ({ onComplete }: { onComplete: () => void }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = useCallback((squares: (string | null)[]) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl text-white mb-6 text-center">
        Win to continue 💕
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center"
          >
            {cell === 'X' && <X className="text-white w-10 h-10" />}
            {cell === 'O' && <Circle className="text-white w-10 h-10" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ================= STEP 3 ================= */

const LoveMeterStep = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-white text-4xl text-center">
        Love Intensity 💗 {progress}%
      </div>
    </motion.div>
  );
};

/* ================= STEP 4 (MODIFIED) ================= */

const TypewriterStep = ({ onEnter }: { onEnter: () => void }) => {
  const text = "THESE ARE ALL PICT OF MY BEAUTIFULL GF!!!!!";
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setFinished(true), 500);
    }
  }, [displayed, text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center"
    >
      <h1 className="text-4xl sm:text-6xl text-white mb-8">
        {displayed}
      </h1>

      {finished && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onEnter}
          className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl text-xl"
        >
          Tap to View 💕
        </motion.button>
      )}
    </motion.div>
  );
};

/* ================= MAIN FLOW ================= */

export default function InteractionFlow({
  onEnterGallery
}: {
  onEnterGallery: () => void;
}) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-[#060010] flex items-center justify-center overflow-hidden">
      <BackgroundHearts />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <LoveModeStep key="1" onComplete={() => setStep(2)} />
        )}
        {step === 2 && (
          <TicTacToeStep key="2" onComplete={() => setStep(3)} />
        )}
        {step === 3 && (
          <LoveMeterStep key="3" onComplete={() => setStep(4)} />
        )}
        {step === 4 && (
          <TypewriterStep key="4" onEnter={onEnterGallery} />
        )}
      </AnimatePresence>
    </div>
  );
}
