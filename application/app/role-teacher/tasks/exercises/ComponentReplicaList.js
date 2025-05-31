'use client';

import { useState, useEffect, useCallback } from 'react';
import { getReplicaExercises } from '@/lib/tasks-teacher/task-service';
import { ScrollArea } from "@/components/ui/scroll-area";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

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
  autoSelectFirst = true 
}) {
  const [exercises, setExercises] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [internalSelectedExercise, setInternalSelectedExercise] = useState(null);
  
  useEffect(() => {
    if (externalSelectedExercise !== undefined) {
      setInternalSelectedExercise(externalSelectedExercise);
    }
  }, [externalSelectedExercise]);

  const fetchExercises = useCallback(async (isRefresh = false) => {
    try {
      if (isInitialLoad) {
        setError(null);
      } else if (!isRefresh) {
        setIsRefreshing(true);
      }
      
      const data = await getReplicaExercises();
      setExercises(data);
      
      if (data && data.length > 0 && autoSelectFirst && externalSelectedExercise === undefined) {
        const firstExercise = data[0];
        setInternalSelectedExercise(firstExercise);
        onExerciseSelect?.(firstExercise);
      }
      
      return data;
    } catch (err) {
      console.error('Error al cargar los ejercicios:', err);
      if (isInitialLoad) {
        setError('Error al cargar los ejercicios. Por favor, intente de nuevo más tarde.');
      }
      return [];
    } finally {
      if (isInitialLoad) {
        setIsInitialLoad(false);
      } else if (!isRefresh) {
        setIsRefreshing(false);
      }
    }
  }, [onExerciseSelect, autoSelectFirst, externalSelectedExercise]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleExerciseSelect = useCallback((exercise) => {
    setInternalSelectedExercise(exercise);
    onExerciseSelect?.(exercise);
  }, [onExerciseSelect]);

  const handleRefresh = useCallback(async () => {
    const data = await fetchExercises(true);
    onRefresh?.(data);
    return data;
  }, [fetchExercises, onRefresh]);

  if (isInitialLoad) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-500">
        Cargando ejercicios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-500">
        No hay ejercicios disponibles
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
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-10 w-10 rounded-md border ${isRefreshing ? 'border-transparent' : 'border-gray-500'} hover:bg-dark-1 hover:border-cta-1 group transition-colors`}
              title="Actualizar lista de ejercicios"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Plus className="h-5 w-5 text-gray-500 transition-colors" />
              ) : (
                <Plus className="h-5 w-5 text-gray-500 transition-colors" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="py-4">
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
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">
                          {exercise.title || 'Ejercicio sin título'}
                        </h3>
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
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
