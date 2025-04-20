"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * PromiseButton - A button that handles loading states for async operations
 *
 * @param {Function} onClick - Async function to execute when button is clicked
 * @param {React.ReactNode} children - Button text
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the button is disabled
 * @param {string} variant - Button variant (default, primary, secondary, etc.)
 * @param {React.ReactNode} loadingText - Optional text to show during loading
 */
const PromiseButton = React.forwardRef(
  ({ onClick, children, className, disabled = false, variant = "default", loadingText, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(false)

    // Handle the async click event
    const handleClick = async (e) => {
      if (isLoading || disabled) return

      try {
        setIsLoading(true)
        // If onClick returns a promise, await it
        if (onClick) {
          await onClick(e)
        }
      } catch (error) {
        console.error("Error in PromiseButton:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Determine button variant classes
    const variantClasses = {
      default: "bg-cta-1 text-black hover:bg-opacity-90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-cta-1 bg-transparent text-cta-1 hover:bg-cta-1/10",
      ghost: "text-cta-1 hover:bg-cta-1/10",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    }

    return (
      <AnimatePresence mode="wait">
        <motion.button
          ref={ref}
          className={cn(
            "relative flex h-12 min-w-[100px] items-center justify-center rounded-md px-6 text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            variantClasses[variant] || variantClasses.default,
            className,
          )}
          onClick={handleClick}
          disabled={isLoading || disabled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          {...props}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingText && <span>{loadingText}</span>}
              </motion.div>
            ) : (
              <motion.span
                key="content"
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                {children}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>
    )
  },
)

PromiseButton.displayName = "PromiseButton"

export default PromiseButton
