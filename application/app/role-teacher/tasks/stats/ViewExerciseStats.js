'use client';

import { useState, useEffect } from 'react';
import { Code2, FileText } from 'lucide-react';
import { getReplicationSubmissions } from '@/lib/tasks-teacher/task-service';
import ProgressChart from './ProgressChart';

export default function ExerciseDetailPanel({ selectedExercise }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchSubmissions() {
      if (!selectedExercise || !selectedExercise.exercise_id) {
        setSubmissions([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const exerciseId = selectedExercise.exercise_id;
        console.log('Buscando todas las submisiones...');
        const allSubmissions = await getReplicationSubmissions({});
        const filteredSubmissions = allSubmissions.filter(
          submission => submission.exercise_id == exerciseId
        );
        
        console.log('Submisiones encontradas para el ejercicio', exerciseId, ':', filteredSubmissions);
        console.log('Total de submisiones encontradas:', filteredSubmissions.length);
        
        setSubmissions(filteredSubmissions);
      } catch (err) {
        console.error('Error al obtener submisiones:', err);
        setError('No se pudieron cargar las submisiones del ejercicio');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSubmissions();
  }, [selectedExercise]);
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
          {/* Gráfico de progreso */}
          <div className="w-full">
            <ProgressChart submissions={submissions} />
          </div>
          
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
          
          <div className="space-y-2 mt-8">
            {loading ? (
              <div className="text-sm text-gray-500">Cargando submisiones...</div>
            ) : error ? (
              <div className="text-sm text-red-500">{error}</div>
            ) : submissions.length === 0 ? (
              <div className="text-sm text-gray-500">No hay submisiones registradas para este ejercicio</div>
            ) : (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Total de submisiones: {submissions.length}</div>
                {/* <div className="overflow-x-auto">
                  <pre className="text-xs p-2 bg-transparent">{JSON.stringify(submissions, null, 2)}</pre>
                </div> */}
              </div>
            )}  
          </div>
        </div>
      </div>
    </div>
  );
}
