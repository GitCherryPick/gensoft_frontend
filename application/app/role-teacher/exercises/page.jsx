"use client"

import { useState } from "react"
import ExerciseForm from "./components/ExerciseForm"

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

  const handleCodeChange = (newCode) => {
    setCode(newCode)
    // Actualizar líneas visibles si es necesario
    const totalLines = newCode.split("\n").length
    setVisibleLines((prev) => prev.filter((line) => line <= totalLines))
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Crear ejercicios</h1>
        <p className="text-gray-600 dark:text-gray-400">
          El estudiante deberá llegar a la respuesta del ejercicio basado en el enunciado, pistas de código y
          correcciones generadas por IA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        <div className="order-2 lg:order-1">
          <ExerciseForm code={code} getVisibleLines={getVisibleLines} onExerciseCreated={handleExerciseCreated} />
        </div>
        <div className="order-1 lg:order-2">
          <div className="h-full rounded-lg border border-border/30 overflow-hidden bg-gray-900">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            </div>
            <div className="h-full p-4 overflow-auto">
              <div className="space-y-1">
                {code.split("\n").map((line, index) => {
                  const lineNumber = index + 1
                  const isVisible = visibleLines.includes(lineNumber)

                  return (
                    <div key={lineNumber} className="flex items-start group min-h-[24px]">
                      <button
                        onClick={() => toggleLineVisibility(lineNumber)}
                        className={`w-6 h-6 mr-3 flex items-center justify-center text-xs rounded transition-colors flex-shrink-0 ${
                          isVisible ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                        title={isVisible ? "Ocultar línea" : "Mostrar línea"}
                      >
                        {isVisible ? "👁" : "🚫"}
                      </button>
                      <span className="w-8 text-gray-500 text-sm mr-4 text-right flex-shrink-0 leading-6">
                        {lineNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const newLines = code.split("\n")
                            newLines[index] = e.target.value
                            handleCodeChange(newLines.join("\n"))
                          }}
                          className={`w-full bg-transparent border-none outline-none text-sm font-mono leading-6 ${
                            isVisible ? "text-white" : "text-gray-600"
                          }`}
                          placeholder={`Línea ${lineNumber}...`}
                        />
                      </div>
                    </div>
                  )
                })}
                {/* Botón para agregar nueva línea */}
                <button
                  onClick={() => handleCodeChange(code + "\n")}
                  className="flex items-center text-gray-500 hover:text-gray-300 text-sm mt-2"
                >
                  <span className="mr-2">+</span>
                  Agregar línea
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
