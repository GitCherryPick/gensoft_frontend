"use client";

import { Bot, CheckCircle, XCircle } from 'lucide-react';

export default function AssistantMessage({ content, evaluation = {}, isRecommendation = false, isSimilarity = false }) {
  const avatarStyle = "w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0";
  
  const baseMessageStyle = "bg-transparent border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 text-[15px] leading-snug";
  
  if (!content && Object.keys(evaluation).length === 0) {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start gap-3 max-w-[90%]">
          <div className={avatarStyle}>
            <Bot size={14} />
          </div>
          <div className={`${baseMessageStyle} rounded-2xl`}>
            Puedes enviar tu código cuando estés listo.
          </div>
        </div>
      </div>
    );
  }

  const hasEvaluation = evaluation && Object.keys(evaluation).length > 0;
  const hasSimilarityScore = evaluation?.puntaje_similitud !== undefined;
  const hasExecutionStatus = evaluation?.ejecucion_simulada_exitosa !== undefined;
  const hasRecommendations = evaluation?.pistas_generadas?.length > 0;

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-3 max-w-[90%]">
        <div className={avatarStyle}>
          <Bot size={14} />
        </div>
        <div className="flex flex-col w-full gap-y-px">
          {content && (
            <div className={`${baseMessageStyle} ${!hasEvaluation ? 'rounded-2xl' : 'rounded-t-2xl'}`}>
              {content}
            </div>
          )}
          
          {hasExecutionStatus && (
            <div className={`${baseMessageStyle} flex items-center gap-2 ${!content ? 'rounded-t-2xl' : ''} ${!hasSimilarityScore && !hasRecommendations ? 'rounded-b-2xl' : ''}`}>
              {evaluation.ejecucion_simulada_exitosa ? (
                <CheckCircle className="text-green-500 w-4 h-4" />
              ) : (
                <XCircle className="text-red-500 w-4 h-4" />
              )}
              <span>
                {evaluation.ejecucion_simulada_exitosa 
                  ? 'Ejecución exitosa' 
                  : 'Error en la ejecución'}
              </span>
            </div>
          )}

          {hasSimilarityScore && (
            <div className={`${baseMessageStyle} ${!hasRecommendations ? 'rounded-b-2xl' : ''} ${!content && !hasExecutionStatus ? 'rounded-t-2xl' : ''}`}>
              Similitud: <span className="font-medium">{Math.round(evaluation.puntaje_similitud * 100)}%</span>
            </div>
          )}

          {hasRecommendations && evaluation.pistas_generadas.map((pista, index) => (
            <div 
              key={index} 
              className={`${baseMessageStyle} ${index === evaluation.pistas_generadas.length - 1 ? 'rounded-b-2xl' : ''} ${!content && !hasExecutionStatus && !hasSimilarityScore && index === 0 ? 'rounded-t-2xl' : ''}`}
            >
              {pista}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

