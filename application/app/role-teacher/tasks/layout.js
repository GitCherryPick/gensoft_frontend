import React from 'react';

export default function TasksLayout({ children }) {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
}

