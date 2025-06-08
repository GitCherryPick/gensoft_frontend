'use client'

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PromiseButton from "@/components/core/PromiseButton"
import { createTaskWithDetails } from "@/lib/content/content-service"
import toast from "react-hot-toast"


const inputStyles = "border-border/50 hover:border-border/70 focus:border-border/90"
const buttonStyles = "border-border/50 hover:border-border/70"

export default function TaskForm({ code, getVisibleLines, getPinnedLines, onTaskCreated }) {
  const [enunciado, setEnunciado] = useState("")
  const [comentarios, setComentarios] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)
  
  const isFormValid = titleRef.current?.value?.trim() && enunciado.trim()

  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = '';
    setEnunciado('');
    setComentarios('');
  };

  const handleSubmit = async () => {
    if (typeof window !== 'undefined' && typeof getPinnedLines === 'function') {
      const pinnedLines = getPinnedLines();
      console.log('Líneas fijadas:', pinnedLines);
    }
    try {
      setIsSubmitting(true);
      const titulo = titleRef.current?.value || 'Sin título';
      
      const lineasVisibles = getVisibleLines();
      const codigoFormateado = code.replace(/\t/g, '  ');
      
      const result = await createTaskWithDetails({
        id_docente: "2003",
        titulo: titulo,
        enunciado: enunciado,
        codigo_objetivo: codigoFormateado,
        lineas_visibles: lineasVisibles,
        comentario_docente: comentarios
      });

      console.log('Tarea creada:', result);
      toast.success('¡Tarea creada exitosamente!', {
        duration: 4000,
        position: 'top-center',
      });
      
      // Reset form
      resetForm();
      
      if (onTaskCreated) {
        onTaskCreated(result);
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      toast.error('Error al crear la tarea. Por favor, inténtalo de nuevo.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
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
            disabled={!isFormValid}
          >
            Crear tarea
          </PromiseButton>
        </div>
      </div>
    </div>
  )
}
