"use client"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // para español

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import PromiseButton from "@/components/core/PromiseButton"
import { createExerciseWithDetailsLab } from "@/lib/sandbox/sandbox-service"
import toast from "react-hot-toast"

registerLocale("es", es);
const inputStyles = "border-border/50 hover:border-border/70 focus:border-border/90"
const buttonStyles = "border-border/50 hover:border-border/70"

export default function ExerciseForm({ code, getVisibleLines, onExerciseCreated }) {
  const [enunciado, setEnunciado] = useState("")
  const [pistas, setPistas] = useState([""]) // Estado para pistas
  const [tests, setTests] = useState([{ input: "", output: "" }]) // Estado para tests
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)
  const [calificacion, setCalificacion] = useState(10)
  const [fechaLimite, setFechaLimite] = useState(null)

  const isFormValid =
    titleRef.current?.value?.trim() && enunciado.trim() && tests.some((test) => test.input.trim() && test.output.trim())

  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = ""
    setEnunciado("")
    setPistas([""])
    setTests([{ input: "", output: "" }])
    setCalificacion(0);
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

  // Funciones para manejar los tests
  const addTest = () => {
    setTests([...tests, { input: "", output: "" }])
  }

  const removeTest = (index) => {
    if (tests.length > 1) {
      setTests(tests.filter((_, i) => i !== index))
    }
  }

  const updateTest = (index, field, value) => {
    const newTests = [...tests]
    newTests[index][field] = value
    setTests(newTests)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const titulo = titleRef.current?.value || "Sin título"

      const lineasVisibles = getVisibleLines()
      const codigoFormateado = code.replace(/\t/g, "  ")

      // Filtrar pistas y tests vacíos
      const pistasLimpias = pistas.filter((pista) => pista.trim() !== "")
      const testsLimpios = tests.filter((test) => test.input.trim() !== "" && test.output.trim() !== "")

      // Estructura requerida para el ejercicio
      const exerciseData = {
        id_docente: "2003",
        title: titulo,
        enunciado: enunciado,
        codigo_plantilla: codigoFormateado,
        lineas_visibles: lineasVisibles,
        tests: testsLimpios,
        pistas: pistasLimpias,
        grade: calificacion,
        date_limit: fechaLimite,
      }

      const result = await createExerciseWithDetailsLab(exerciseData)

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
              Título del ejercicio
            </label>
            <Input
              ref={titleRef}
              id="exercise-title"
              type="text"
              placeholder="Ej: Ejercicio de funciones básicas en Python"
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
              placeholder="Describe el problema que el estudiante debe resolver paso a paso..."
              value={enunciado}
              onChange={(e) => setEnunciado(e.target.value)}
              className={`w-full bg-transparent min-h-[80px] text-sm ${inputStyles} placeholder:text-muted-foreground/60`}
            />
          </div>

          {/* Campo de pistas */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Pistas para el estudiante</label>
            <p className="text-sm text-gray-500/80 mb-2">
              Agrega pistas que ayuden al estudiante a resolver el ejercicio paso a paso.
            </p>
            <div className="space-y-2">
              {pistas.map((pista, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Ej: Recuerda definir la función con la palabra clave 'def'`}
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

          {/* Campo de tests */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Tests de verificación</label>
            <p className="text-sm text-gray-500/80 mb-2">
              Define tests para verificar automáticamente la solución del estudiante.
            </p>
            <div className="space-y-4">
              {tests.map((test, index) => (
                <div key={index} className="space-y-2 p-3 border border-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-400">Test {index + 1}</span>
                    {tests.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTest(index)}
                        className="px-3 text-red-400 hover:text-red-300 border-red-400/50 hover:border-red-300/50"
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Entrada (Input)</label>
                      <Input
                        placeholder="Ej: suma(2, 3)"
                        value={test.input}
                        onChange={(e) => updateTest(index, "input", e.target.value)}
                        className={`w-full bg-transparent min-h-[36px] text-sm ${inputStyles}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Salida esperada (Output)</label>
                      <Input
                        placeholder="Ej: 5"
                        value={test.output}
                        onChange={(e) => updateTest(index, "output", e.target.value)}
                        className={`w-full bg-transparent min-h-[36px] text-sm ${inputStyles}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTest}
                className="text-blue-400 hover:text-blue-300 border-blue-400/50 hover:border-blue-300/50"
              >
                + Agregar test
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="fecha-limite" className="block text-sm font-medium text-gray-300">
            Fecha límite
          </label>
          <DatePicker
            id="fecha-limite"
            selected={fechaLimite}
            onChange={(date) => setFechaLimite(date)}
            dateFormat="dd/MM/yyyy"
            locale="es"
            placeholderText="dd/mm/aaaa"
            className={`w-full bg-transparent min-h-[42px] text-sm text-white px-2 py-1 rounded border border-gray-600`}
          />
        </div>

        
        <div className="space-y-1.5">
          <label htmlFor="calificacion" className="block text-sm font-medium text-gray-300">
            Calificación máxima
          </label>
          <Input
            id="calificacion"
            type="number"
            min="0"
            max="100"
            value={calificacion}
            onChange={(e) => setCalificacion(Number(e.target.value))}
            className={`w-full bg-transparent min-h-[42px] flex items-center text-sm ${inputStyles}`}
          />
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
