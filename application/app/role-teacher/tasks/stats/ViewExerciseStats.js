'use client';

import { Code2, FileText, Hash } from 'lucide-react';

export default function ExerciseDetailPanel({ selectedExercise }) {
  if (!selectedExercise) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-4">
          <h3 className="text-lg font-medium">Ningún ejercicio seleccionado</h3>
          <p className="text-sm text-gray-500">
            Selecciona un ejercicio de la lista para ver sus detalles o crea uno nuevo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">{selectedExercise.title || 'Ejercicio sin título'}</h2>
        <p className="text-sm text-gray-600">
          {selectedExercise.prompt || 'Sin descripción disponible'}
        </p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {selectedExercise.code && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Code2 className="h-4 w-4" />
                <span>Código</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{selectedExercise.code}</pre>
              </div>
            </div>
          )}

          {selectedExercise.instructions && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Instrucciones</span>
              </div>
              <div className="prose max-w-none">
                <p>{selectedExercise.instructions}</p>
              </div>
            </div>
          )}

          {selectedExercise.visible_lines && selectedExercise.visible_lines.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Hash className="h-4 w-4" />
                <span>Líneas visibles</span>
              </div>
              <div className="text-sm text-gray-700">
                {selectedExercise.visible_lines.map(line => line.numero).join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
