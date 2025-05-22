import React from 'react';

export default function TasksLayout({ children }) {
  return (
    <div className="flex flex-col h-full">
      {/* Sección superior - Título */}
      <div className="flex-none px-6 py-4">
        <h1 className="text-2xl font-semibold text-white">Creación de actividad de réplica</h1>
        <p className="text-sm text-gray-400 mt-1">
          Actividad donde el estudiante debe resolver un ejercicio completando el código.
          Se proporcionan guías paso a paso para que alcance la solución correcta.
        </p>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
}
