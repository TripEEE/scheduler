import React, { useState } from "react"

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const newHistory = [...history]
    if (replace) {
      newHistory.pop()
    }
    newHistory.push(newMode)
    setHistory(newHistory)
  }

  const back = () => {
    if (history.length < 2) {
      return
    }
    setHistory(history.slice(0, -1))
  }

  const mode = history[history.length - 1]
  return { mode, transition, back }
}

