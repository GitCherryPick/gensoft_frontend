'use client'

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PromiseButton from "@/components/core/PromiseButton"
import { createTaskWithDetails } from "@/lib/tasks-teacher/task-service"

// Estilos locales
const inputStyles = "border-border/50 hover:border-border/70 focus:border-border/90"
const buttonStyles = "border-border/50 hover:border-border/70"

export default function TaskForm({ code, onTaskCreated }) {
  const [enunciado, setEnunciado] = useState("")
  const [comentarios, setComentarios] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const titulo = titleRef.current?.value || 'Sin título'
      
      const result = await createTaskWithDetails({
        id_docente: "2003",
        titulo: titulo,
        enunciado: enunciado,
        codigo_objetivo: code,
        lineas_visibles: [1, 2, 3],
        comentario_docente: comentarios
      })

      console.log('Tarea creada:', result)
      if (onTaskCreated) {
        onTaskCreated(result)
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col rounded-lg border border-border/30 overflow-hidden">
      <div className="px-6 flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 py-6">
        <div className="space-y-1.5">
        <label htmlFor="task-title" className="block text-sm font-medium text-gray-300">
          Título de la actividad
        </label>
        <Input
          ref={titleRef}
          id="task-title"
          type="text"
          placeholder=""
          className={`w-full bg-transparent min-h-[42px] flex items-center text-sm ${inputStyles}`}
          defaultValue={''}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="task-enunciado" className="block text-sm font-medium text-gray-300">
          Enunciado
        </label>
        <Input
          id="task-enunciado"
          type="text"
          placeholder=""
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
          className={`w-full bg-transparent min-h-[42px] flex items-center text-sm ${inputStyles}`}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="task-comentarios" className="block text-sm font-medium text-gray-300">
          Comentarios adicionales
        </label>
        <p className="text-sm text-gray-500/80 mb-2">
          Indica los conceptos o métodos que se deben usar para resolver el ejercicio.
        </p>
        <Textarea
          id="task-comentarios"
          placeholder="Ej: Se debe usar el operador ternario y la función map() para resolver el ejercicio"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className={`bg-transparent min-h-[80px] text-sm ${inputStyles} placeholder:text-muted-foreground/60`}
        />
      </div>

        </div>
        <div className="pt-2 pb-6 mt-auto">
          <PromiseButton
            variant="default"
            className={`w-full text-sm h-10 min-h-10 ${buttonStyles}`}
            onClick={handleSubmit}
          >
            Crear tarea
          </PromiseButton>
        </div>
      </div>
    </div>
  )
}
