
export default function TestFeedback({ dataFeedback }) {
  const safeFeedback = Array.isArray(dataFeedback) ? dataFeedback : [];
  return (
    <details className="mt-4">
      <summary className="cursor-pointer font-medium text-blue-600">
        Ver detalles de pruebas
      </summary>
      <div className="mt-2 text-sm flex flex-wrap justify-center gap-4">
        {safeFeedback.map((feedback, idx) => (
          <div key={idx} className="p-4 bg-blue-950 border rounded-lg border-blue-300">
            <strong>Input:</strong> {feedback.input} <br />
            <strong>Esperado:</strong> {feedback.expectedOutput} <br />
            <strong>Salida:</strong> {feedback.output || <em>(vacío)</em>} <br />
            {feedback.error && (
              <span className="text-red-600"><strong>Error:</strong> {feedback.error}</span>
            )}
          </div>
        ))}
      </div>
    </details>
  )
}