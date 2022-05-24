import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory( prev => replace ? [...prev.slice(0, prev.length-1), newMode] : [...prev, newMode]);
  };

  const back = () => {
      console.log(history)
      const historyCopy = [...history]
      if(historyCopy.length > 1) { historyCopy.pop() }
      setHistory(historyCopy)
      const last = historyCopy.slice(-1)
      setMode(...last)
    }
  return { mode, transition , back};
}

