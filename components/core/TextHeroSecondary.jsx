import React from "react"
import { cn } from "@/lib/utils"

export default function TextHeroSecondary({ text = "Texto secundario de ejemplo para el hero.", className, ...props }) {
  const lines = Array.isArray(text) ? text : text.split("\n").map((line) => line.trim())

  return (
    <p className={cn("mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto", className)} {...props}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </p>
  )
}
