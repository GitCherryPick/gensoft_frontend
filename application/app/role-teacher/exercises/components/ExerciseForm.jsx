"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import PromiseButton from "@/components/core/PromiseButton"
import { createExerciseWithDetails } from "@/lib/content/content-service"
import toast from "react-hot-toast"

const inputStyles = "border-border/50 hover:border-border/70 focus:border-border/90"
const buttonStyles = "border-border/50 hover:border-border/70"

export default function ExerciseForm({ code, getVisibleLines, onExerciseCreated }) {
  const [enunciado, setEnunciado] = useState("")
  const [comentarios, setComentarios] = useState("")
  const [pistas, setPistas] = useState([""]) // Nuevo estado para pistas
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)

  const isFormValid = titleRef.current?.value?.trim() && enunciado.trim()

  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = ""
    setEnunciado("")
    setComentarios("")
    setPistas([""])
  }

  // Funciones para manejar las pistas
  const addPista = () => {
    setPistas([...pistas, ""])
  }

  const removePista = (index) => {
    if (pistas.length > 1) {
      setPistas(pistas.filter((_, i) => i !== index))
    }
  }

  const updatePista = (index, value) => {
    const newPistas = [...pistas]
    newPistas[index] = value
    setPistas(newPistas)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const titulo = titleRef.current?.value || "Sin título"

      const lineasVisibles = getVisibleLines()
      const codigoFormateado = code.replace(/\t/g, "  ")

      // Filtrar pistas vacías
      const pistasLimpias = pistas.filter((pista) => pista.trim() !== "")

      const result = await createExerciseWithDetails({
        id_docente: "2003",
        titulo: titulo,
        enunciado: enunciado,
        codigo_objetivo: codigoFormateado,
        lineas_visibles: lineasVisibles,
        comentario_docente: comentarios,
        pistas: pistasLimpias, // Agregar pistas al objeto
      })

      console.log("Ejercicio creado:", result)
      toast.success("¡Ejercicio creado exitosamente!", {
        duration: 4000,
        position: "top-center",
      })

      resetForm()

      if (onExerciseCreated) {
        onExerciseCreated(result)
      }
    } catch (error) {
      console.error("Error al crear el ejercicio:", error)
      toast.error("Error al crear el ejercicio. Por favor, inténtalo de nuevo.", {
        duration: 4000,
        position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col rounded-lg border border-border/30 overflow-hidden">
      <div className="px-6 flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 py-6">
          <div className="space-y-1.5">
            <label htmlFor="exercise-title" className="block text-sm font-medium text-gray-300">
              Título de la tarea
            </label>
            <Input
              ref={titleRef}
              id="exercise-title"
              type="text"
              placeholder=""
              className={`w-full bg-transparent min-h-[42px] flex items-center text-sm ${inputStyles}`}
              defaultValue=""
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="exercise-enunciado" className="block text-sm font-medium text-gray-300">
              Enunciado
            </label>
            <Textarea
              id="exercise-enunciado"
              placeholder="Describe el problema que el estudiante debe resolver..."
              value={enunciado}
              onChange={(e) => setEnunciado(e.target.value)}
              className={`w-full bg-transparent min-h-[80px] text-sm ${inputStyles} placeholder:text-muted-foreground/60`}
            />
          </div>

          {/* NUEVO CAMPO: Pistas */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Pistas para el estudiante</label>
            <p className="text-sm text-gray-500/80 mb-2">
              Agrega pistas que ayuden al estudiante a resolver el ejercicio.
            </p>
            <div className="space-y-2">
              {pistas.map((pista, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Pista ${index + 1}...`}
                    value={pista}
                    onChange={(e) => updatePista(index, e.target.value)}
                    className={`flex-1 bg-transparent min-h-[42px] text-sm ${inputStyles}`}
                  />
                  {pistas.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePista(index)}
                      className="px-3 text-red-400 hover:text-red-300 border-red-400/50 hover:border-red-300/50"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPista}
                className="text-blue-400 hover:text-blue-300 border-blue-400/50 hover:border-blue-300/50"
              >
                + Agregar pista
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="exercise-comentarios" className="block text-sm font-medium text-gray-300">
              Comentarios adicionales
            </label>
            <p className="text-sm text-gray-500/80 mb-2">
              Indica los conceptos o métodos que se deben usar para resolver el ejercicio.
            </p>
            <Textarea
              id="exercise-comentarios"
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
            Crear ejercicio
          </PromiseButton>
        </div>
      </div>
    </div>
  )
}
