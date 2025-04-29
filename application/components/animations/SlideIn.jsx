"use client"
import { motion } from "framer-motion"

export default function SlideIn({ children, direction = "right", delay = 0, duration = 0.5, className = "" }) {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 },
  }

  const initial = directionMap[direction] || directionMap.right

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...initial }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
