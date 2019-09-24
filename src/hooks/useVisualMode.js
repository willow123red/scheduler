import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      const newHistory = history.concat(newMode);
      setHistory(newHistory);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length < 2) return;
    const newHistory = history.slice(0, -1);
    const prevMode = newHistory[newHistory.length - 1]
    setMode(prevMode);
    setHistory(newHistory);
  }
  return { mode, transition, back };
};