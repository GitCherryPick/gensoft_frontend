'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ExerciseDetailPanel from './stats/ViewExerciseStats';

const ComponentReplicaList = dynamic(
  () => import('@/app/role-teacher/tasks/exercises/ComponentReplicaList'),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center h-32">
      <p>Cargando lista de ejercicios...</p>
    </div>
  )}
);

export default function TasksReplicaPage({ onCreateNew }) {
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
          onCreateNew={onCreateNew}
        />
      </div>

      <ExerciseDetailPanel selectedExercise={selectedExercise} />
    </div>
  );
}
