import React, { useState, useEffect, useRef } from 'react';

const LittlePrincePomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');
  const [sessions, setSessions] = useState(0);
  const [task, setTask] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [focusTime, setFocusTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  
  const intervalRef = useRef(null);
  
  const quotes = [
    "It is the time you have wasted for your rose that makes your rose so important.",
    "One sees clearly only with the heart. What is essential is invisible to the eye.",
    "You become responsible, forever, for what you have tamed.",
    "All grown-ups were once children... but only few of them remember it.",
    "The most beautiful things in the world cannot be seen or touched, they are felt with the heart."
  ];
  
  const planets = [
    "The Little Prince's Asteroid B-612",
    "The King's Planet",
    "The Businessman's Planet", 
    "The Lamplighter's Planet",
    "Earth - The Rose Garden"
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      
      if (timeLeft === 0 && isActive) {
        if (mode === 'focus') {
          setSessions(prev => prev + 1);
          if ((sessions + 1) % 4 === 0) {
            setMode('longBreak');
            setTimeLeft(longBreakTime * 60);
          } else {
            setMode('shortBreak');
            setTimeLeft(shortBreakTime * 60);
          }
        } else {
          setMode('focus');
          setTimeLeft(focusTime * 60);
        }
        setIsActive(false);
      }
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, mode, sessions, focusTime, shortBreakTime, longBreakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setTimeLeft(focusTime * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(shortBreakTime * 60);
    } else {
      setTimeLeft(longBreakTime * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const total = mode === 'focus' ? focusTime * 60 : 
                  mode === 'shortBreak' ? shortBreakTime * 60 : 
                  longBreakTime * 60;
    return ((total - timeLeft) / total) * 100;
  };

  const getCurrentQuote = () => {
    return quotes[sessions % quotes.length];
  };

  const getCurrentPlanet = () => {
    return planets[sessions % planets.length];
  };

  return (
    <div className={`min-h-screen transition-all duration-900 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white'
        : 'bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 text-gray-800'
    }`}>

      {/* Floating decorations */}
        <div className="absolute top-16 right-32 text-xl animate-pulse" style={{animationDelay: '0s'}}>⭐</div>
        <div className="absolute top-64 left-16 text-lg animate-pulse" style={{animationDelay: '1.2s'}}>⭐</div>
        <div className="absolute bottom-32 right-24 text-2xl animate-pulse" style={{animationDelay: '2.1s'}}>⭐</div>
        <div className="absolute top-32 left-80 text-sm animate-pulse" style={{animationDelay: '0.8s'}}>⭐</div>
        <div className="absolute bottom-96 right-64 text-xl animate-pulse" style={{animationDelay: '1.7s'}}>⭐</div>
        <div className="absolute top-96 left-32 text-lg animate-pulse" style={{animationDelay: '0.4s'}}>⭐</div>
        <div className="absolute bottom-64 left-96 text-2xl animate-pulse" style={{animationDelay: '2.5s'}}>⭐</div>
        <div className="absolute top-48 right-16 text-sm animate-pulse" style={{animationDelay: '1.0s'}}>⭐</div>
        <div className="absolute bottom-80 right-80 text-xl animate-pulse" style={{animationDelay: '0.3s'}}>⭐</div>
        <div className="absolute top-80 left-24 text-lg animate-pulse" style={{animationDelay: '1.9s'}}>⭐</div>
        <div className="absolute bottom-48 right-48 text-2xl animate-pulse" style={{animationDelay: '0.6s'}}>⭐</div>
        <div className="absolute top-24 left-64 text-sm animate-pulse" style={{animationDelay: '2.3s'}}>⭐</div>
        <div className="absolute bottom-16 left-40 text-xl animate-pulse" style={{animationDelay: '1.4s'}}>⭐</div>
        <div className="absolute top-72 right-72 text-lg animate-pulse" style={{animationDelay: '0.1s'}}>⭐</div>
        <div className="absolute bottom-72 left-72 text-2xl animate-pulse" style={{animationDelay: '1.8s'}}>⭐</div>
        <div className="absolute top-40 right-96 text-sm animate-pulse" style={{animationDelay: '2.7s'}}>⭐</div>
        <div className="absolute bottom-24 right-32 text-xl animate-pulse" style={{animationDelay: '0.9s'}}>⭐</div>
        <div className="absolute top-88 left-48 text-lg animate-pulse" style={{animationDelay: '1.5s'}}>⭐</div>
        <div className="absolute bottom-40 right-56 text-2xl animate-pulse" style={{animationDelay: '0.2s'}}>⭐</div>
        <div className="absolute top-56 left-88 text-sm animate-pulse" style={{animationDelay: '2.0s'}}>⭐</div>

      
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-200' : 'text-orange-600'}`}>
          Petite Pomodoro
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-400 ${
              isDarkMode 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            ⚙️
          </button>
        </div>
      </div>
      
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="mx-6 mb-6 p-6 rounded-2xl backdrop-blur-sm bg-white bg-opacity-20 border border-white border-opacity-30 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Focus Time (minutes)</label>
              <input
                type="number"
                value={focusTime}
                onChange={(e) => setFocusTime(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 rounded-lg bg-white bg-opacity-30 border border-white border-opacity-50 backdrop-blur-sm"
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Short Break (minutes)</label>
              <input
                type="number"
                value={shortBreakTime}
                onChange={(e) => setShortBreakTime(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 rounded-lg bg-white bg-opacity-30 border border-white border-opacity-50 backdrop-blur-sm"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Long Break (minutes)</label>
              <input
                type="number"
                value={longBreakTime}
                onChange={(e) => setLongBreakTime(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 rounded-lg bg-white bg-opacity-30 border border-white border-opacity-50 backdrop-blur-sm"
                min="1"
                max="120"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Timer Container */}
      <div className="flex flex-col items-center justify-center px-6 pb-12">
        
        {/* Current Planet */}
        <div className={`text-center mb-8 ${isDarkMode ? 'text-blue-200' : 'text-purple-700'}`}>
          <p className="text-sm opacity-80 mb-1">Currently visiting...</p>
          <p className="text-lg font-medium">{getCurrentPlanet()}</p>
        </div>

        {/* Mode Display */}
        <div className={`text-center mb-6 ${isDarkMode ? 'text-yellow-200' : 'text-orange-600'}`}>
          <h2 className="text-3xl font-bold mb-2">
            {mode === 'focus' ? '🌹 Focus Time' : 
             mode === 'shortBreak' ? '🦊 Short Break' : 
             '🐑 Long Break'}
          </h2>
          <p className="text-lg opacity-80">
            Session {sessions + 1} • {mode === 'focus' ? 'Time to focus' : 'Time to rest'}
          </p>
        </div>

        {/* Timer Display */}
        <div className="relative mb-8">
          <div className={`w-64 h-64 rounded-full border-8 flex items-center justify-center ${
            mode === 'focus' 
              ? isDarkMode ? 'border-pink-500 bg-pink-400 bg-opacity-10' : 'border-rose-500 bg-rose-500 bg-opacity-10'
              : isDarkMode ? 'border-emerald-500 bg-green-400 bg-opacity-10' : 'border-emerald-500 bg-emerald-500 bg-opacity-10'
          }`} style={{
            background: `conic-gradient(from 0deg, ${
              mode === 'focus' 
                ? isDarkMode ? '#d64992ff' : '#f43f5e' 
                : isDarkMode ? '#4ade80' : '#10b981'
            } ${getProgress()}%, transparent ${getProgress()}%)`
          }}>
            <div className={`w-48 h-48 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-indigo-900' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className={`text-4xl font-mono font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Input */}
        {mode === 'focus' && (
          <div className="mb-6 w-full max-w-md">
            <input
              type="text"
              placeholder="What are you working on? 📝"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 backdrop-blur-sm placeholder-gray-800 text-center"
            />
          </div>
        )}

        {/* Quote Display */}
        {mode !== 'focus' && (
          <div className="mb-8 max-w-md text-center">
            <div className={`p-4 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-sm ${
              isDarkMode ? 'text-blue-100' : 'text-purple-700'
            }`}>
              <p className="italic text-lg leading-relaxed">"{getCurrentQuote()}"</p>
              <p className="text-sm mt-2 opacity-70">— The Little Prince</p>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className={`px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 shadow-lg ${
              isActive 
                ? isDarkMode ? 'bg-pink-600 hover:bg-pink-700' : 'bg-red-400 hover:bg-red-500'
                : isDarkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-400 hover:bg-green-500'
            } hover:scale-105 active:scale-95`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={resetTimer}
            className={`px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 shadow-lg ${
              isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
            } hover:scale-105 active:scale-95`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LittlePrincePomodoro;