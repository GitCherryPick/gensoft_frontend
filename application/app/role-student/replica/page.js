"use client";

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth/auth-service';
import dynamic from 'next/dynamic';
import { evaluateStudentSolution } from '@/lib/tasks-teacher/task-service';
import { getExerciseById } from '@/lib/content/content-service';
import RightPanel from './RightPanel';

const CodeEditorCopy = dynamic(
  () => import('@/components/core/CodeEditorCopy'),
  { ssr: false }
);

export default function ReplicaPage({ params, onBack = () => {} }) {
  const exerciseId = params?.id || 1;
  const [code, setCode] = useState('');
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [typingStartTime, setTypingStartTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCodeChange = (newCode) => {
    if (!isTyping && newCode.trim() !== '') {
      setIsTyping(true);
      setTypingStartTime(new Date());
    } else if (isTyping && newCode.trim() === '') {
      setIsTyping(false);
      setTypingStartTime(null);
    }
    setCode(newCode);
  };

  const calculateTypingTime = () => {
    if (!typingStartTime) return 0;
    const endTime = new Date();
    const timeDiff = (endTime - typingStartTime) / 1000;
    return Math.round(timeDiff);
  };

  const handleHelpRequest = async () => {
    console.log('Solicitando ayuda...');
    try {
      if (!exercise) {
        throw new Error('No hay datos del ejercicio disponibles');
      }
      
      const tiempoRedaccion = calculateTypingTime();
      
      setIsTyping(false);
      setTypingStartTime(null);
      
      const userId = currentUser?.id || '1';
      
      const resultado = await evaluateStudentSolution({
        id_estudiante: userId,
        id_ejercicio: exercise.id_ejercicio,
        codigo_fuente: code,
        tiempo_redaccion: tiempoRedaccion,
        consignas_docente: exercise.enunciado || '',
        codigo_objetivo: exercise.codigo_objetivo || '',
        contexto_ejercicio: exercise.comentario_docente || ''
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
    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error al cargar el usuario actual:', error);
      }
    };

    loadCurrentUser();
  }, []);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setLoading(true);
        const userId = currentUser?.id || '2003';
        const exerciseData = await getExerciseById(exerciseId);
        setExercise(exerciseData);
        setCode(exerciseData.codigo_base);
      } catch (err) {
        console.error('Error al cargar el ejercicio:', err);
        setError('No se pudo cargar el ejercicio. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchExercise();
    }
  }, [currentUser]);

  return (
    <div className="flex h-full w-full p-4 gap-4">
      <div className="w-3/5 flex flex-col h-full p-4">
        <div className="flex items-start gap-4 mb-4">
          <button 
            onClick={onBack}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full mt-1"
            aria-label="Volver atrás"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600 dark:text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
          
          <div className="space-y-2">
            {error ? (
              <h2 className="text-lg font-semibold text-red-600 animate-fade-in">
                Error: {error}
              </h2>
            ) : (
              <>
                <h2 className="text-lg font-semibold animate-fade-in">
                  {exercise?.titulo}
                </h2>
                <p className="text-sm text-gray-800 dark:text-gray-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  {exercise?.enunciado?.split('. ')[0]}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <CodeEditorCopy
            codeInput={code}
            setCodeInput={handleCodeChange}
          />
        </div>
      </div>
      
      <div className="w-2/5 border-l border-gray-200 dark:border-gray-700">
        {!loading && (
          error ? (
            <div className="p-4">
              <p className="text-sm text-gray-500">No hay información adicional disponible</p>
            </div>
          ) : (
            exercise && (
              <RightPanel 
                onHelpRequest={handleHelpRequest} 
                code={code}
                evaluationResult={evaluationResult}
              />
            )
          )
        )}
      </div>
    </div>
  )
}