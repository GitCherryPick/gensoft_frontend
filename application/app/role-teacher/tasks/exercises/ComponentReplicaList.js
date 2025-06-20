'use client';

import { useState, useEffect, useCallback } from 'react';
import { getReplicaExercises } from '@/lib/tasks-teacher/task-service';
import { ScrollArea } from "@/components/ui/scroll-area";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { deleteExercise } from '@/lib/content/content-service';
import { toast } from 'sonner';

/**
 * @param {Object} props - Propiedades del componente
 * @param {Object} [props.selectedExercise] - Ejercicio actualmente seleccionado (opcional)
 * @param {Function} [props.onExerciseSelect] - Función que se llama cuando se selecciona un ejercicio
 * @param {Function} [props.onRefresh] - Función para forzar la actualización de la lista
 * @param {boolean} [props.autoSelectFirst=true] - Si es true, selecciona automáticamente el primer ejercicio al cargar
 */
export default function ComponentReplicaList({ 
  selectedExercise: externalSelectedExercise, 
  onExerciseSelect, 
  onRefresh,
  onCreateNew,
  autoSelectFirst = true 
}) {
  const [exercises, setExercises] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [internalSelectedExercise, setInternalSelectedExercise] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    if (externalSelectedExercise !== undefined) {
      setInternalSelectedExercise(externalSelectedExercise);
    }
  }, [externalSelectedExercise]);

  useEffect(() => {
    return () => {
      setInternalSelectedExercise(null);
      setExercises([]);
      setError(null);
    };
  }, [])

  const handleDeleteExercise = async (exerciseId) => {
    if (!exerciseId) {
      console.error('ID de ejercicio no proporcionado');
      return;
    }
    
    try {
      setIsDeleting(true);
      const updatedExercises = exercises.filter(ex => ex.exercise_id !== exerciseId);
      setExercises(updatedExercises);
      if (internalSelectedExercise?.exercise_id === exerciseId) {
        setInternalSelectedExercise(null);
        onExerciseSelect?.(null);
      }
      await deleteExercise(exerciseId);
      toast.success('Ejercicio eliminado correctamente');
      if (updatedExercises.length > 0) {
        await fetchExercises();
      }
    } catch (error) {
      console.error('Error al eliminar el ejercicio:', error);
      toast.error(error.message || 'Error al eliminar el ejercicio');
      await fetchExercises();
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchExercises = useCallback(async () => {
    try {
      setError(null);
      const data = await getReplicaExercises();
      setExercises(data || []);
      
      if (data && data.length > 0 && autoSelectFirst && externalSelectedExercise === undefined) {
        const firstExercise = data[0];
        setInternalSelectedExercise(firstExercise);
        onExerciseSelect?.(firstExercise);
      } else if (data && data.length === 0) {
        setInternalSelectedExercise(null);
        onExerciseSelect?.(null);
      }
      
      return data;
    } catch (err) {
      console.error('Error al cargar los ejercicios:', err);
      setError('No se pudieron cargar los ejercicios.');
      setExercises([]);
      return [];
    } finally {
      setIsInitialLoad(false);
    }
  }, [autoSelectFirst, externalSelectedExercise, onExerciseSelect]);

  useEffect(() => {
    fetchExercises();
    
    if (onRefresh) {
      onRefresh(fetchExercises);
    }
  }, [fetchExercises, onRefresh]);

  const handleExerciseSelect = (exercise) => {
    setInternalSelectedExercise(exercise);
    onExerciseSelect?.(exercise);
  };



  if (isInitialLoad) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-xl font-semibold">Ejercicios de Réplica</h1>
              <p className="text-sm text-gray-600">Selecciona un ejercicio para ver los detalles</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-md border border-gray-500 hover:bg-dark-1 hover:border-cta-1 group transition-colors"
              title="Crear nuevo ejercicio"
              onClick={onCreateNew}
            >
              <Plus className="h-5 w-5 text-gray-500 group-hover:text-cta-1 transition-colors" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-500">Cargando ejercicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-xl font-semibold">Ejercicios de Réplica</h1>
            <p className="text-sm text-gray-600">Selecciona un ejercicio para ver los detalles</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-md border border-gray-500 hover:bg-dark-1 hover:border-cta-1 group transition-colors"
            title="Crear nuevo ejercicio"
            onClick={onCreateNew}
          >
            <Plus className="h-5 w-5 text-gray-500 group-hover:text-cta-1 transition-colors" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="py-4">
            {error ? (
              <div className="h-full flex items-center justify-center p-4">
                <div className="text-center text-red-600 dark:text-red-400">
                  <p className="font-medium">Error al cargar los ejercicios</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            ) : exercises.length === 0 ? (
              <div className="h-full flex items-center justify-center p-4">
                <p className="text-sm text-gray-500">No hay ejercicios disponibles</p>
              </div>
            ) : (
            <div className="space-y-1">
              {exercises.map((exercise, index) => (
                <FadeIn key={exercise.exercise_id} delay={0.1 + index * 0.05} duration={0.3}>
                  <div
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 border-l-2 
                      ${
                        internalSelectedExercise?.exercise_id === exercise.exercise_id
                          ? "border-cta-1 bg-gray-50 dark:bg-gray-800/20"
                          : "border-transparent"
                      } cursor-pointer transition-colors`}
                    onClick={() => handleExerciseSelect(exercise)}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">
                            {exercise.title || 'Ejercicio sin título'}
                          </h3>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteExercise(exercise.exercise_id);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full"
                            disabled={isDeleting}
                            title="Eliminar ejercicio"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {exercise.prompt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {exercise.prompt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
