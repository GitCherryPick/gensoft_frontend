'use client';

import ComponentBackButton from './ComponentBackButton';
import LabPython from '../lab-exercise/page'

export default function ViewExerciseLaboratory({ exercise, onBack }) {
  return (
    <div className="w-full h-full bg-dark-1 p-6 overflow-y-auto overflow-x-hidden">
      <ComponentBackButton onBack={onBack} />
      <LabPython taskId={exercise.id.replace("lab-", "")}  />
    </div>
  );
}
