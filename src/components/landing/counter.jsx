"use client"
import { useRef, useState, useEffect } from "react"

export default function Counter({ number = 0, duration = 3000 }) {
  const counterElement = useRef(null)
  const startTimestamp = useRef(null)
  const [counterValue, setCounterValue] = useState("0")
  const [animationCompleted, setAnimationCompleted] = useState(false)
  let animationRequestId = null
  let observer = null

  const precision =
    number % 1 === 0 ? 0 : (number.toString().split(".")[1] || []).length

  const easeOut = t => {
    return 1 - Math.pow(1 - t, 5)
  }

  const startAnimation = () => {
    const step = timestamp => {
      if (!startTimestamp.current) startTimestamp.current = timestamp
      const progress = Math.min(
        (timestamp - (startTimestamp.current || 0)) / duration,
        1
      )
      const easedProgress = easeOut(progress)
      const newRawValue = parseFloat(
        (easedProgress * number).toFixed(precision)
      )
      setCounterValue(newRawValue.toFixed(precision))

      if (progress < 1) {
        animationRequestId = window.requestAnimationFrame(step)
      } else {
        setAnimationCompleted(true)
      }
    }

    animationRequestId = window.requestAnimationFrame(step)
  }

  useEffect(() => {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationCompleted) {
          startAnimation()
        }
      })
    })

    observer.observe(counterElement.current)

    return () => {
      if (animationRequestId) {
        window.cancelAnimationFrame(animationRequestId)
      }
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return <span ref={counterElement}>{counterValue}</span>
}
