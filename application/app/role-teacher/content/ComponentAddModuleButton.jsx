"use client"

import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import ModalCreateModule from "./ModalCreateModule"

export default function ComponentAddModuleButton({
  onClick,
  text = "Añadir nuevo módulo",
  delay = 0.2,
  className = "",
  courseId,
  onModuleCreated,
}) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.2 }}
        className={`mt-6 p-4 rounded-md border border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-dark-2 cursor-pointer flex items-center justify-center ${className}`}
        onClick={handleClick}
      >
        <Plus size={18} className="text-light-3 mr-2" />
        <span className="text-light-3">{text}</span>
      </motion.div>

      <ModalCreateModule
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        courseId={courseId}
        onModuleCreated={onModuleCreated}
      />
    </>
  )
}
