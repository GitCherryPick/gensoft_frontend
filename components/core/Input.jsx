"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export default function Input({
  type = "text",
  placeholder = "Enter text...",
  className,
  icon: Icon,
  secure = false,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = secure ? (showPassword ? "text" : "password") : type

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-light-3">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 rounded-md border border-neutral-700 bg-transparent px-4 text-light-1 text-variant-3 placeholder:text-light-3 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-sm",
            Icon && "pl-10", 
            secure && "pr-10", 
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />

        {secure && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-light-3 hover:text-light-2 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
