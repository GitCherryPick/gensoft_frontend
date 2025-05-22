import React from 'react';

export default function TasksLayout({ children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none px-6 py-4">
        <h1 className="text-2xl font-semibold text-white">Creación de actividad - Ejercicio de réplica</h1>
        <p className="text-sm text-gray-400 mt-1">
          El estudiante deberá llegar a la respuesta del ejercicio basado en el enunciado, pistas de codigo y correcciones generadas por IA.
        </p>
      </div>

      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
}

