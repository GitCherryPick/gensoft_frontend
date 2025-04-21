"use client"
import { motion } from "framer-motion"

export default function LoadingTransition() {
  return (
    <motion.div
      className="fixed inset-0 bg-dark-1 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-cta-1 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-light-1">Cargando...</p>
      </div>
    </motion.div>
  )
}
