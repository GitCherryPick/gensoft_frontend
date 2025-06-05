'use client';

import { useState, useEffect, useRef } from 'react';
import { Code2, FileText, Loader2 } from 'lucide-react';
import { getReplicationSubmissions } from '@/lib/tasks-teacher/task-service';
import ProgressChart from './ProgressChart';

const FadeIn = ({ show, children, className = '' }) => {
  const [shouldRender, setRender] = useState(show);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (show) {
      setRender(true);
    } else {
      timeoutRef.current = setTimeout(() => setRender(false), 200);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [show]);

  return shouldRender ? (
    <div
      className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  ) : null;
};

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
      <div className="h-full flex items-center justify-center text-center">
        <div className="max-w-md space-y-4 px-4">
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
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {loading || submissions.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm text-gray-500">
                  {loading ? 'Cargando datos del ejercicio...' : 'Ningún estudiante ha resuelto este ejercicio aún'}
                </p>
                {loading && <Loader2 className="h-8 w-8 animate-spin text-gray-500" />}
              </div>
            </div>
          ) : (
            <FadeIn show={true} className="space-y-6">
              <div className="w-full transition-opacity duration-200">
                <ProgressChart submissions={submissions} />
              </div>
              
              {selectedExercise.code && (
                <div className="space-y-2 transition-opacity duration-200">
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
                <div className="space-y-2 transition-opacity duration-200">
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
                {error ? (
                  <div className="text-sm text-red-500">{error}</div>
                ) : (
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Total de respuestas: {submissions.length}</div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-200 mb-3">Detalles de las submisiones</h3>
                      <div className="divide-y divide-gray-800">
                        {submissions.map((submission, index) => (
                          <div key={submission.id || index} className="py-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{new Date(submission.submission_date).toLocaleDateString()}</span>
                              <span className="text-xs text-gray-400">{submission.typing_duration_seconds}s</span>
                            </div>
                            
                            {submission.diferencias_detectadas && submission.diferencias_detectadas.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs font-medium text-gray-300 mb-1">Diferencias:</div>
                                <ul className="list-disc ml-4 text-xs text-gray-300 space-y-1">
                                  {submission.diferencias_detectadas.map((diff, diffIndex) => (
                                    <li key={diffIndex}>{diff}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {submission.errores_sintacticos && submission.errores_sintacticos.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs font-medium text-gray-300 mb-1">Errores sintácticos:</div>
                                <ul className="list-disc ml-4 text-xs text-gray-300 space-y-1">
                                  {submission.errores_sintacticos.map((error, errorIndex) => (
                                    <li key={errorIndex}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}  
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
