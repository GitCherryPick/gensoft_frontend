"use client"

import { useState } from "react"
import ExerciseForm from "./components/ExerciseForm"
import CodeEditor from "@/components/core/CodeEditor"

export default function ExercisesPage() {
  // Código editable
  const [code, setCode] = useState(`# Ejemplo de script Python
def suma(a, b):
    """Devuelve la suma de dos números"""
    return a + b

resultado = suma(3, 4)
print(f"La suma es: {resultado}")`)

  // Líneas visibles por defecto
  const [visibleLines, setVisibleLines] = useState([1, 2, 3, 4, 5, 6, 7])

  const getVisibleLines = () => {
    return visibleLines
  }

  const handleExerciseCreated = (exercise) => {
    console.log("Nuevo ejercicio creado:", exercise)
  }

  const toggleLineVisibility = (lineNumber) => {
    setVisibleLines((prev) =>
      prev.includes(lineNumber)
        ? prev.filter((line) => line !== lineNumber)
        : [...prev, lineNumber].sort((a, b) => a - b),
    )
  }

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Creación de ejercicios</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Como docente, crea ejercicios interactivos donde los estudiantes deben replicar código específico. Los
          ejercicios incluyen pistas, tests automáticos y retroalimentación con IA para guiar el aprendizaje.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
        {/* Formulario */}
        <div className="order-2 lg:order-1 overflow-auto">
          <ExerciseForm code={code} getVisibleLines={getVisibleLines} onExerciseCreated={handleExerciseCreated} />
        </div>

        {/* Editor de código */}
        <div className="order-1 lg:order-2 overflow-hidden">
          <CodeEditor
            codeInput={code}
            setCodeInput={setCode}
            visibleLines={visibleLines}
            onToggleLineVisibility={toggleLineVisibility}
          />
        </div>
      </div>
    </div>
  )
}
