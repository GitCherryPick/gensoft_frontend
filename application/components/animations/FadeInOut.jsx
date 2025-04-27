"use client"
import { motion, AnimatePresence } from "framer-motion"

export default function FadeInOut({ children, show, duration = 0.5, initialY = 10, exitY = -10 }) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: exitY }}
          transition={{ duration, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
