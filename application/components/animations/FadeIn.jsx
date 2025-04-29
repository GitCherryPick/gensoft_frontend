"use client"
import { motion } from "framer-motion"

export default function FadeIn({ children, delay = 0, duration = 0.5, className = "", initialY = 10, exitY = -10 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: exitY }}
      transition={{ duration, ease: "easeInOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
