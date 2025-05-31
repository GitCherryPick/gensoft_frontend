'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Code2, FileText, Hash } from 'lucide-react';

const ComponentReplicaList = dynamic(
  () => import('@/app/role-teacher/tasks/exercises/ComponentReplicaList'),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center h-32">
      <p>Cargando lista de ejercicios...</p>
    </div>
  )}
);

export default function TasksReplicaPage() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseSelect = useCallback((exercise) => {
    setSelectedExercise(exercise);
  }, []);
  const handleRefresh = useCallback((exercises) => {
    if (exercises && exercises.length > 0 && !selectedExercise) {
      setSelectedExercise(exercises[0]);
    }
  }, [selectedExercise]);

  return (
    <div className="h-full flex overflow-hidden">
      <div className="w-[30%] h-full flex flex-col border-r border-gray">
        <ComponentReplicaList 
          selectedExercise={selectedExercise}
          onExerciseSelect={handleExerciseSelect}
          onRefresh={handleRefresh}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {selectedExercise ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">{selectedExercise.title || 'Ejercicio sin título'}</h2>
              <p className="text-sm text-gray-600">
                {selectedExercise.description || 'Sin descripción disponible'}
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
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md space-y-4">
              <h3 className="text-lg font-medium">Ningún ejercicio seleccionado</h3>
              <p className="text-sm text-gray-500">
                Selecciona un ejercicio de la lista para ver sus detalles o crea uno nuevo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
