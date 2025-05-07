"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"


export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "2xl",
  maxHeight = "90vh",
  closeOnOverlayClick = true,
  fullHeight = false,
}) {
  if (!isOpen) return null

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }

  const maxWidthClass = maxWidthClasses[maxWidth] || "max-w-2xl"

  const handleOverlayClick = closeOnOverlayClick ? onClose : () => {}

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80"
            onClick={handleOverlayClick}
          />

          {/* Contenido del modal con animación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`relative w-full ${maxWidthClass} overflow-hidden rounded-xl bg-dark-1 shadow-xl flex flex-col`}
            style={{ maxHeight }}
          >
            {/* Cabecera del modal */}
            <div className="relative px-8 pt-8 pb-4">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full p-2 text-light-3 transition-colors hover:bg-dark-2 hover:text-light-1"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-light-1">{title}</h2>
              <p className="mt-3 text-sm text-light-3">{description || "Escriba su propio contenido"}</p>
            </div>

            {/* Cuerpo del modal */}
            <div className={`px-8 pb-8 pt-4 overflow-y-auto ${fullHeight ? "flex-1 flex flex-col" : ""}`}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
