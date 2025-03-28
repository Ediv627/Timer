"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State to store time in seconds
  const [time, setTime] = useState(0);
  // State to track if timer is running
  const [isRunning, setIsRunning] = useState(false);
  // State to store input values
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  // Update time every second when timer is running
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          // Update input fields with new time
          setHours(Math.floor(newTime / 3600).toString());
          setMinutes(Math.floor((newTime % 3600) / 60).toString());
          setSeconds((newTime % 60).toString());
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setHours("");
      setMinutes("");
      setSeconds("");
      window.alert("Time isOut!");
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Handle start
  const startTimer = () => {
    // Convert input values to total seconds
    const totalSeconds =
      parseInt(hours || "0") * 3600 +
      parseInt(minutes || "0") * 60 +
      parseInt(seconds || "0");
    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setIsRunning(true);
    }
  };

  // Handle pause
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Handle reset
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  return (
    <div className="container">
      {/* Timer */}
      <div className="tab-content active" id="timer">
        <div className="display">
          <input
            type="number"
            id="hours"
            placeholder="00"
            min="0"
            max="23"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            disabled={isRunning}
          />
          <span>:</span>
          <input
            type="number"
            id="minutes"
            placeholder="00"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            disabled={isRunning}
          />
          <span>:</span>
          <input
            type="number"
            id="seconds"
            placeholder="00"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="controls">
          <button id="startTimer" onClick={startTimer}>
            Start
          </button>
          <button id="pauseTimer" onClick={pauseTimer}>
            Pause
          </button>
          <button id="resetTimer" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
