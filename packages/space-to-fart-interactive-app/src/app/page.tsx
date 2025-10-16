'use client';

import { useState, useEffect } from 'react';

export default function FartApp() {
  const [farts, setFarts] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([]);
  const [fartCount, setFartCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);

  // Array of fart emojis and text variations
  const fartEmojis = ['💨', '🌪️', '💨', '🌬️', '💨'];
  const fartSounds = ['PFFFT!', 'BRAAAP!', 'TOOT!', 'PARP!', 'FRRRT!', 'BLARP!', 'PFFFFFF!'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        createFart();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    createFart();
  };

  const createFart = () => {
    const newFart = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      timestamp: Date.now()
    };

    setFarts(prev => [...prev, newFart]);
    setFartCount(prev => {
      const newCount = prev + 1;
      // Show achievement message for milestones
      if (newCount > 0 && newCount % 10 === 0) {
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 5000); // Hide after 5 seconds
      }
      return newCount;
    });

    // Remove fart after 5 seconds
    setTimeout(() => {
      setFarts(prev => prev.filter(fart => fart.id !== newFart.id));
    }, 5000);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-100 dark:from-green-900 dark:to-yellow-900 relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-green-800 dark:text-green-200 mb-4">
          COOPS FART
        </h1>
        <p className="text-2xl text-green-700 dark:text-green-300 mb-2">
          Press SPACEBAR or CLICK anywhere to fart!
        </p>
        <div className="text-lg text-green-600 dark:text-green-400">
          Fart Count: <span className="font-bold text-2xl">{fartCount}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/80 p-4 rounded-lg shadow-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          🎯 Hit SPACEBAR or CLICK anywhere!
        </p>
      </div>

      {/* Fart animations */}
      {farts.map((fart) => (
        <div
          key={fart.id}
          className="absolute pointer-events-none"
          style={{
            left: fart.x,
            top: fart.y,
            animation: 'fartAnimation 5s ease-out forwards'
          }}
        >
          <div className="text-6xl fart-wiggle">
            {fartEmojis[Math.floor(Math.random() * fartEmojis.length)]}
          </div>
          <div className="text-2xl font-bold text-green-800 dark:text-green-200 text-center mt-2 animate-pulse">
            {fartSounds[Math.floor(Math.random() * fartSounds.length)]}
          </div>
        </div>
      ))}

      {/* Fun background elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="text-8xl opacity-20 animate-pulse">
          💨
        </div>
      </div>

      {/* Achievement messages */}
      {showAchievement && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-black p-6 rounded-lg shadow-xl animate-bounce z-10">
          <div className="text-3xl font-bold text-center">
            🎉 {fartCount} FARTS! 🎉
          </div>
          <div className="text-lg text-center mt-2">
            You're on fire! 🔥
          </div>
        </div>
      )}


    </div>
  );
}














