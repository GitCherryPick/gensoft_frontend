'use client';

import { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import TaskForm from './exercises/ComponentTaskForm';

const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
);

export default function ExerciseCreate({ onBack }) {
  const [code, setCode] = useState(`# Ejemplo de script Python\ndef suma(a, b):\n    \"\"\"Devuelve la suma de dos números\"\"\"\n    return a + b\n\nresultado = suma(3, 4)\nprint(f\"La suma es: {resultado}\")\n`);
  const editorRef = useRef(null);

  const handleTaskCreated = (result) => {
    console.log('Tarea creada:', result);
    if (result && onBack) {
      onBack();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Creación de actividad - Ejercicio de réplica</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                El estudiante deberá llegar a la respuesta del ejercicio basado en el enunciado, pistas de código y correcciones generadas por IA.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
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
    </div>
  );
}