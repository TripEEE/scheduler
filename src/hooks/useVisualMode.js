import React, { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory([...history, mode])
    }
    setMode(newMode)
  }

  const back = () => {
    if (!history.length) {
      return
    }
    setMode(history[history.length - 1])
    setHistory(history.slice(0, -1))
  }

  return { mode, transition, back }
}

