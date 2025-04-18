import React from "react"
import { cn } from "@/lib/utils"

export default function TextHeroPrimary({ text = ["Titulo", "de Ejemplo"], className, ...props }) {
  const lines = Array.isArray(text) ? text : text.split("\n").map((line) => line.trim())

  return (
    <h1
      className={cn(
        "text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50",
        className,
      )}
      {...props}
    >
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </h1>
  )
}
