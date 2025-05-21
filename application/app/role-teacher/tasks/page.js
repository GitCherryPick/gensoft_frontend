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
    <div className="h-full w-full p-4">
      <CodeEditorCopy
        codeInput={code}
        setCodeInput={setCode}
      />
    </div>
  )
}