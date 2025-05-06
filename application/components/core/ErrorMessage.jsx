"use client"

import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"


export default function ErrorMessage({ icon, message = "Ha ocurrido un error", className }) {
  const IconComponent = icon || AlertCircle

  return (
    <div className={cn("flex flex-col items-center justify-center text-red-500 p-4", className)}>
      <IconComponent className="h-8 w-8 mb-2" />
      <p className="text-center">{message}</p>
    </div>
  )
}
