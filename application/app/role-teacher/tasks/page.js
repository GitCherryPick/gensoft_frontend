"use client"
import { useState } from "react"
import dynamic from "next/dynamic"
import TaskForm from "./TaskForm"

// Import the copied code editor with SSR disabled
const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
)

export default function TasksPage() {
  const [code, setCode] = useState(`# Ejemplo de script Python\ndef suma(a, b):\n    \"\"\"Devuelve la suma de dos números\"\"\"\n    return a + b\n\nresultado = suma(3, 4)\nprint(f\"La suma es: {resultado}\")\n`)

  const handleTaskCreated = (result) => {
    console.log('Tarea creada desde el componente padre:', result)
    // Aquí podrías mostrar una notificación o redirigir al usuario
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      {/* Columna izquierda - Formulario */}
      <div className="flex-1 flex flex-col min-h-0">
        <TaskForm 
          code={code} 
          onTaskCreated={handleTaskCreated} 
        />
      </div>

      {/* Columna derecha - Editor */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-full flex flex-col rounded-lg overflow-hidden border border-border/30">
          <CodeEditorCopy
            codeInput={code}
            setCodeInput={setCode}
          />
        </div>
      </div>
    </div>
  )
}
