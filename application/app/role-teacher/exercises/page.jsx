"use client"

import { useState, useRef } from "react"
import ExerciseForm from "./components/ExerciseForm"
import dynamic from 'next/dynamic';

const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
);

export default function ExercisesPage() {
  const [code, setCode] = useState(`# Ejemplo de script Python\ndef suma(a, b):\n    """Devuelve la suma de dos números"""\n    return a + b\n\nresultado = suma(3, 4)`)
  const editorRef = useRef(null);

  const handleExerciseCreated = (exercise) => {
    console.log("Nuevo ejercicio creado:", exercise)
  }

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Creación de ejercicios</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Como docente, crea ejercicios interactivos donde los estudiantes deban resolver ejercicios aplicando conocimientos aprendidos. Los
          ejercicios incluyen pistas, tests automáticos y retroalimentación con IA para guiar el aprendizaje.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
        <div className="order-2 lg:order-1 overflow-auto">
          <ExerciseForm
            code={code}
            getVisibleLines={() => editorRef.current?.getVisibleLines?.() || []}
            onExerciseCreated={handleExerciseCreated}
          />
        </div>

        <div className="order-1 lg:order-2 overflow-hidden">
          <CodeEditorCopy
            ref={editorRef}
            codeInput={code}
            setCodeInput={setCode}
            showLineVisibilityToggle={true}
          />
        </div>
      </div>
    </div>
  )
}
