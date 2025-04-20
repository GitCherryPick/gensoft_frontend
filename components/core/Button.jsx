"use client"
import { cn } from "@/lib/utils"
import React from "react"

/**
 * Button - A styled button component that matches PromiseButton styling
 *
 * @param {Function} onClick - Function to execute when button is clicked
 * @param {React.ReactNode} children - Button text
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} variant - Button variant (default, primary, secondary, etc.)
 */
const Button = React.forwardRef(
  ({ onClick, children, className, disabled = false, variant = "default", ...props }, ref) => {
    // Determine button variant classes
    const variantClasses = {
      default: "bg-cta-1 text-black hover:bg-opacity-90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-cta-1 bg-transparent text-cta-1 hover:bg-cta-1/10",
      ghost: "text-cta-1 hover:bg-cta-1/10",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative flex h-12 min-w-[100px] items-center justify-center rounded-md px-6 text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant] || variantClasses.default,
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <span className="flex items-center justify-center">{children}</span>
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
