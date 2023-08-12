import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
      setHistory(prevHistory => [...prevHistory.slice(0, -1), newMode]);
      // if the original arr = [FIRST, SECOND]
      // afterwards, [FIRST, THIRD]
    } else {
      setMode(newMode)
      setHistory(prevHistory => [...prevHistory, newMode]);

    }
  }

  function back() {

    if (history.length > 1) {
      // Only go back if there's more than one mode in history
      setHistory(prev => {
        const newHistory = prev.slice(0, -1);
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      })
    }
  }

  return { mode, transition, back, history }
};
