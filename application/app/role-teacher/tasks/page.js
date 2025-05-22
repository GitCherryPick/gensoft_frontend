"use client"
import { useState } from "react"
import dynamic from "next/dynamic"

// Import the copied code editor with SSR disabled
const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
)

export default function TasksPage() {
  const [code, setCode] = useState(`# Ejemplo de script Python\ndef suma(a, b):\n    """Devuelve la suma de dos números"""\n    return a + b\n\nresultado = suma(3, 4)\nprint(f"La suma es: {resultado}")\n`)


  return (
    <div className="h-full flex flex-col lg:flex-row-reverse overflow-hidden gap-4 p-4">
      {/* Columna derecha - Editor */}
      <div className="flex-1 flex flex-col min-h-0">
        <p className="text-sm text-gray-500/80 mb-2 px-1">
          Escribe aquí la solución completa del ejercicio. Las líneas marcadas como visibles 
          se mostrarán como pistas para el estudiante.
        </p>
        <div className="flex-1 min-h-0 rounded-lg overflow-hidden">
          <CodeEditorCopy
            codeInput={code}
            setCodeInput={setCode}
          />
        </div>
      </div>

      {/* Columna izquierda - Contenido adicional */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-full rounded-lg p-4 overflow-auto">
          <p className="text-gray-400">Área para configuraciones adicionales</p>
        </div>
      </div>
    </div>
  )
}