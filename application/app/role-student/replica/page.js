"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { evaluateStudentSolution } from '@/lib/tasks-teacher/task-service';
import { getExerciseById } from '@/lib/content/content-service';
import RightPanel from './RightPanel';

const CodeEditorCopy = dynamic(
  () => import('@/components/core/CodeEditorCopy'),
  { ssr: false }
);

export default function ReplicaPage() {
  const [code, setCode] = useState('');
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleHelpRequest = async () => {
    console.log('Solicitando ayuda...');
    try {
      const resultado = await evaluateStudentSolution({
        id_estudiante: '2003',
        id_ejercicio: '2003',
        codigo_fuente: code,
        tiempo_redaccion: 10
      });
      console.log('Resultado de la evaluación:', resultado);
      setEvaluationResult(resultado);
      return resultado;
    } catch (error) {
      console.error('Error al evaluar la solución:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const exerciseData = await getExerciseById('2003');
        setExercise(exerciseData);
        setCode(exerciseData.codigo_base);
      } catch (err) {
        console.error('Error al cargar el ejercicio:', err);
        setError('No se pudo cargar el ejercicio. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full p-4 gap-4">
      {/* Editor de código */}
      <div className="w-3/5 flex flex-col h-full p-4">
        <div 
          className={`space-y-2 mb-4 transition-all duration-300 ease-in-out ${exercise ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <h2 className="text-lg font-semibold animate-fade-in">
            {exercise?.titulo}
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {exercise?.enunciado.split('. ')[0]}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <CodeEditorCopy
            codeInput={code}
            setCodeInput={setCode}
          />
        </div>
      </div>
      
      {/* Sección derecha */}
      {exercise && (
        <div className="w-2/5 border-l border-gray-200 dark:border-gray-700">
          <RightPanel 
            onHelpRequest={handleHelpRequest} 
            code={code}
            evaluationResult={evaluationResult}
          />
        </div>
      )}
    </div>
  )
}
