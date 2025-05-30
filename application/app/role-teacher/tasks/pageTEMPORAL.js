"use client"
import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import TaskForm from "./TaskForm"

const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
)

export default function TasksPage() {
  const [code, setCode] = useState(`# Ejemplo de script Python\ndef suma(a, b):\n    \"\"\"Devuelve la suma de dos números\"\"\"\n    return a + b\n\nresultado = suma(3, 4)\nprint(f\"La suma es: {resultado}\")\n`)
  const editorRef = useRef(null);

  const handleTaskCreated = (result) => {
    console.log('Sep', result)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 py-4">
        <h1 className="text-2xl font-semibold text-white">Creación de actividad - Ejercicio de réplica</h1>
        <p className="text-sm text-gray-400 mt-1">
          El estudiante deberá llegar a la respuesta del ejercicio basado en el enunciado, pistas de codigo y correcciones generadas por IA.
        </p>
      </div>
      <div className="h-full flex flex-col lg:flex-row gap-4 p-4">
      <div className="flex-1 flex flex-col min-h-0">
        <TaskForm 
          code={code}
          getVisibleLines={() => editorRef.current?.getVisibleLines?.() || []}
          onTaskCreated={handleTaskCreated} 
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-full flex flex-col rounded-lg overflow-hidden border border-border/30">
          <CodeEditorCopy
            ref={editorRef}
            codeInput={code}
            setCodeInput={setCode}
            showLineVisibilityToggle={true}
          />
        </div>
      </div>
    </div>
    </div>
  )
}
