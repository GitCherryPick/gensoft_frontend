import React from "react"
import { cn } from "@/lib/utils"

export default function TextHeroPrimary({ text = "Titulo \n de Ejemplo", className, ...props }) {
  const lines = text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line.trim()}
    </React.Fragment>
  ))

  return (
    <h1
      className={cn(
        "text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50",
        className,
      )}
      {...props}
    >
      {lines}
    </h1>
  )
}
