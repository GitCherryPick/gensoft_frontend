'use client';

import { useState } from 'react';
import TasksReplicaPage from './TasksReplicaPage';
import ExerciseCreate from './ExerciseCreate';

export const dynamic = 'force-dynamic';

export default function TasksPage() {
  const [showCreateView, setShowCreateView] = useState(false);

  const toggleView = () => {
    setShowCreateView(prev => !prev);
  };

  return showCreateView ? (
    <ExerciseCreate onBack={toggleView} />
  ) : (
    <TasksReplicaPage onCreateNew={toggleView} />
  );
}

