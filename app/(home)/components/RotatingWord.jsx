"use client"
import { useState, useEffect } from "react"
import { HyperText } from "@/components/magicui/hyper-text"

export default function RotatingWord() {
  const words = ["INCREIBLE", "DIVERTIDO", "FACIL", "EMOCIONANTE", "INSPIRADOR"]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
      setKey((prev) => prev + 1)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block">
      <HyperText
        key={key}
        className="text-3xl sm:text-4xl md:text-5xl p-0 font-bold text-light-1 font-sans inline-block"
        animateOnHover={false}
        startOnView={true}
        duration={1200}
      >
        {words[currentIndex]}
      </HyperText>
      <span className="absolute bottom-1 left-0 w-full h-1 bg-light-1"></span>
    </span>
  )
}
