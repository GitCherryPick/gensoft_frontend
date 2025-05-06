"use client"

import { useState } from "react"
import Modal from "@/components/core/Modal"
import { createModule } from "@/lib/content/content-service"
import toast from "react-hot-toast"

export default function ModalCreateModule({ isOpen, onClose, courseId, onModuleCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [level, setLevel] = useState("1")
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("El título es obligatorio")
      return
    }

    setIsCreating(true)

    try {
      const moduleData = {
        course_id: courseId,
        title: title.trim(),
        description: description.trim(),
        level,
      }

      const newModule = await createModule(moduleData)

      toast.success("Módulo creado correctamente")

      if (onModuleCreated) {
        onModuleCreated(newModule)
      }

      // Limpiar el formulario
      setTitle("")
      setDescription("")
      setLevel("1")

      onClose()
    } catch (error) {
      console.error("Error al crear el módulo:", error)
      toast.error("Error al crear el módulo")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear nuevo módulo"
      description="Completa la información para crear un nuevo módulo en el curso"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-light-1 mb-1">
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-light-1"
            placeholder="Título del módulo"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-light-1 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-light-1"
            placeholder="Descripción del módulo"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-light-1 mb-1">
            Nivel
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-light-1"
            style={{ backgroundColor: "#131219", color: "var(--color-light-1)" }}
          >
            <option value="1" style={{ backgroundColor: "#131219", color: "var(--color-light-1)" }}>
              Principiante
            </option>
            <option value="2" style={{ backgroundColor: "#131219", color: "var(--color-light-1)" }}>
              Intermedio
            </option>
            <option value="3" style={{ backgroundColor: "#131219", color: "var(--color-light-1)" }}>
              Avanzado
            </option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-2 transition-colors"
            disabled={isCreating}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-cta-1 text-black hover:bg-opacity-90 transition-colors"
            disabled={isCreating}
          >
            {isCreating ? "Creando..." : "Crear módulo"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
