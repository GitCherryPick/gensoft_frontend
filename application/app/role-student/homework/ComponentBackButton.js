'use client';

import React from 'react';

export default function ComponentBackButton({ onBack, label = 'Volver a la lista' }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center text-light-2 hover:text-light-1 transition-colors"
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      {label}
    </button>
  );
}
