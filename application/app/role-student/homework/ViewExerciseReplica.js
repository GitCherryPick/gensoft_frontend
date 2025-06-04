'use client';

import ComponentBackButton from './ComponentBackButton';

export default function ViewExerciseReplica({ exercise, onBack }) {
  return (
    <div className="w-full h-full bg-dark-1 p-6 overflow-auto">
      <ComponentBackButton onBack={onBack} />
      <pre className="text-light-2">
        {JSON.stringify(exercise, null, 2)}
      </pre>
    </div>
  );
}
