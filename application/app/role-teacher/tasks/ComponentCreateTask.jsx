"use client"

import { useState } from "react"
import { createTask } from "@/lib/tasks-teacher/task-service"
import toast from "react-hot-toast"
import CodeEditor from "@/components/core/CodeEditor"

export default function ComponentCreateTask({ onTaskCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [expectedCode, setExpectedCode] = useState("")
  const [expectedResult, setExpectedResult] = useState("")
  const [templateCode, setTemplateCode] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("El título es obligatorio")
      return
    }

    if (!description.trim()) {
      toast.error("La descripción es obligatoria")
      return
    }

    setIsCreating(true)

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        expected_code: expectedCode.trim() || null,
        expected_result: expectedResult.trim() || null,
        template_code: templateCode.trim() || null,
      }

      const newTask = await createTask(taskData)
      toast.success("Tarea creada correctamente")

      if (onTaskCreated) {
        onTaskCreated(newTask)
      }

      // Limpiar el formulario
      setTitle("")
      setDescription("")
      setExpectedCode("")
      setExpectedResult("")
      setTemplateCode("")
    } catch (error) {
      console.error("Error al crear la tarea:", error)
      toast.error("Error al crear la tarea")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-dark-2 rounded-lg shadow-md h-screen overflow-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-light-1 mb-6">Crear Nueva Tarea</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-light-2 mb-1">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-gray-900 dark:text-light-1"
              placeholder="Título de la tarea"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-light-2 mb-1">
              Descripción *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-gray-900 dark:text-light-1"
              placeholder="Descripción detallada de la tarea"
              rows={4}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-light-2 mb-1">
            Código Esperado
          </label>
          <CodeEditor
            codeInput={expectedCode}
            setCodeInput={setExpectedCode}
            placeholder="Ingresa el código que esperas que el estudiante replique"
          />
        </div>

        <div>
          <label htmlFor="expectedResult" className="block text-sm font-medium text-gray-700 dark:text-light-2 mb-1">
            Resultado Esperado
          </label>
          <textarea
            id="expectedResult"
            value={expectedResult}
            onChange={(e) => setExpectedResult(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 text-gray-900 dark:text-light-1"
            placeholder="Describe el resultado esperado de la tarea"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-light-2 mb-1">
            Código Template
          </label>
          <CodeEditor
            codeInput={templateCode}
            setCodeInput={setTemplateCode}
            placeholder="Código base que se le proporcionará al estudiante"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-cta-1 text-black hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={isCreating}
          >
            {isCreating ? "Creando..." : "Crear Tarea"}
          </button>
        </div>
      </form>
    </div>
  )
}
