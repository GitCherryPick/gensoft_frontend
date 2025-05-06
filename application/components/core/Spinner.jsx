"use client"

import { cn } from "@/lib/utils"

export default function Spinner({ size = "md", className }) {
  const sizeClasses = {
    xs: "h-5 w-5 border-[1.5px]",
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-10 w-10 border-3",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn("rounded-full animate-spin", sizeClasses[size] || sizeClasses.md)}
        style={{
          borderColor: "#3a3942",
          borderTopColor: "rgba(176, 161, 255, 0.7)", 
          animationDuration: "0.8s",
        }}
      />
    </div>
  )
}
