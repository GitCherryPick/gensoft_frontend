'use client';

import ComponentBackButton from './ComponentBackButton';
import ReplicaPage from '../replica/page';

export default function ViewExerciseReplica({ exercise, onBack = () => {} }) {
  return (
    <div className="w-full h-full bg-dark-1 overflow-auto">
      <ReplicaPage params={{ id: exercise?.id }} onBack={onBack} />
    </div>
  );
}
