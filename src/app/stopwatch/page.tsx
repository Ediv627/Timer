"use client";

import { useState, useEffect } from "react";

export default function Stopwatch() {
  // State to store time in milliseconds
  const [time, setTime] = useState(0);
  // State to track if stopwatch is running
  const [isRunning, setIsRunning] = useState(false);

  // Update time every 10 milliseconds when stopwatch is running
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    // Cleanup interval when component unmounts or stopwatch stops
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time into separate units
  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: ms.toString().padStart(2, "0"),
    };
  };

  // Handle start
  const startStopwatch = () => {
    setIsRunning(true);
  };

  // Handle stop
  const stopStopwatch = () => {
    setIsRunning(false);
  };

  // Handle reset
  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const timeDisplay = formatTime(time);

  return (
    <div className="container">
      <div className="tab-content active" id="stopwatch">
        <div className="display">
          <span id="stopwatchHours">{timeDisplay.hours}</span>
          <span>:</span>
          <span id="stopwatchMinutes">{timeDisplay.minutes}</span>
          <span>:</span>
          <span id="stopwatchSeconds">{timeDisplay.seconds}</span>
          <span>:</span>
          <span id="stopwatchMilliseconds">{timeDisplay.milliseconds}</span>
        </div>
        <div className="controls">
          <button id="startStopwatch" onClick={startStopwatch}>
            Start
          </button>
          <button id="pauseStopwatch" onClick={stopStopwatch}>
            Stop
          </button>
          <button id="resetStopwatch" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
