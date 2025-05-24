"use client";



export default function AssistantMessage({ content, evaluation = {}, isRecommendation = false, isSimilarity = false }) {
  const baseMessageStyle = "bg-[#1F1F23] text-gray-300 px-4 py-3 text-[15px] leading-snug w-fit max-w-full";
  
  if (!content && Object.keys(evaluation).length === 0) {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start max-w-[90%]">
          <div className={`${baseMessageStyle} rounded-2xl`} style={{ backgroundColor: '#1F1F23' }}>
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

  // Determinar cuál es el primer y último mensaje visible
  const hasAnyContent = content && (Array.isArray(content) ? content.length > 0 : true);
  
  const firstVisibleMessage = 
    (hasAnyContent && 'content') || 
    (hasExecutionStatus && 'execution') || 
    (hasSimilarityScore && 'similarity') || 
    (hasRecommendations && 'recommendations');
    
  const lastVisibleMessage = 
    (hasRecommendations && evaluation.pistas_generadas.length > 0 && 'lastRecommendation') ||
    (hasSimilarityScore && 'similarity') ||
    (hasExecutionStatus && 'execution') ||
    (hasAnyContent && 'content');

  // Convertir content a array si es un string
  const contentArray = Array.isArray(content) ? content : [content].filter(Boolean);

  return (
    <div className="flex justify-start mb-4 w-full">
      <div className="flex items-start w-auto max-w-full">
        <div className="flex flex-col gap-y-1.5 w-auto">
          {contentArray.map((contentItem, index) => (
            <div 
              key={index} 
              className={`${baseMessageStyle} ${
                firstVisibleMessage === 'content' && index === 0 ? 'rounded-tl-2xl ' : ''
              }${
                index === contentArray.length - 1 && lastVisibleMessage === 'content' ? 'rounded-bl-2xl ' : ''
              }rounded-r-2xl`}
            >
              {contentItem}
            </div>
          ))}
          
          {hasExecutionStatus && (
            <div className={`${baseMessageStyle} 
              ${firstVisibleMessage === 'execution' ? 'rounded-tl-2xl ' : ''}
              ${lastVisibleMessage === 'execution' ? 'rounded-bl-2xl ' : ''}
              rounded-r-2xl`}>
              {evaluation.ejecucion_simulada_exitosa 
                ? 'Sintaxis correcta' 
                : 'Error en la sintaxis'}
            </div>
          )}

          {hasSimilarityScore && (
            <div className={`${baseMessageStyle} 
              ${firstVisibleMessage === 'similarity' ? 'rounded-tl-2xl ' : ''}
              ${lastVisibleMessage === 'similarity' ? 'rounded-bl-2xl ' : ''}
              rounded-r-2xl`}>
              Similitud: <span className="font-medium">{Math.round(evaluation.puntaje_similitud * 100)}%</span>
            </div>
          )}

          {hasRecommendations && evaluation.pistas_generadas.map((pista, index) => {
            const isLastRecommendation = lastVisibleMessage === 'lastRecommendation' && index === evaluation.pistas_generadas.length - 1;
            return (
              <div 
                key={index} 
                className={`${baseMessageStyle} 
                  ${firstVisibleMessage === 'recommendations' && index === 0 ? 'rounded-tl-2xl ' : ''}
                  ${isLastRecommendation ? 'rounded-bl-2xl ' : ''}
                  rounded-r-2xl`}
              >
                {pista}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

