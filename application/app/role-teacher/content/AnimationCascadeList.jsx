"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimationCascadeList({
  children,
  staggerDelay = 0.05,
  duration = 0.2,
  distance = 5,
  enabled = true,
}) {
  if (!enabled || !children) {
    return <>{children}</>
  }

  const childrenArray = React.Children.toArray(children)

  return (
    <AnimatePresence>
      {childrenArray.map((child, index) => (
        <motion.div
          key={child.key || `cascade-item-${index}`}
          initial={{ opacity: 0, y: distance }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -distance }}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
