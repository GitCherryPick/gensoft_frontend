import React from "react";
import { Clock, FileText, GraduationCap } from "lucide-react";

const ExamPreview = ({ exam, questionTypes }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {exam.title || "Título del Examen"}
            </h1>
            <p className="text-blue-100 opacity-90">
              {exam.description || "Descripción del examen"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-6">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Clock size={18} />
            <span className="font-medium">{exam.timeLimit} minutos</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="font-medium">
              {exam.questions.length} preguntas
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="font-medium">
              {exam.questions.reduce((sum, q) => sum + q.points, 0)} puntos
              totales
            </span>
          </div>
        </div>
      </div>

      {exam.questions.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">
            <FileText size={64} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-medium text-gray-400 mb-2">
            Vista previa vacía
          </h3>
          <p className="text-gray-500">
            Agrega algunas preguntas para ver cómo se verá tu examen.
          </p>
        </div>
      ) : (
        exam.questions.map((question, index) => {
          const questionType = questionTypes.find(
            (t) => t.type === question.type
          );
          return (
            <div
              key={question.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div
                    className={`bg-gradient-to-r ${questionType?.gradient} p-2 rounded-lg text-white shadow-lg flex-shrink-0`}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {question.title || "Pregunta sin título"}
                    </h3>
                    {question.description && (
                      <p className="text-gray-400 text-sm">
                        {question.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-lg">
                    {question.points} pts
                  </span>
                </div>
              </div>

              <div className="mt-4">
                {question.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {question.options?.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-200"
                      >
                        <input
                          type="radio"
                          name={`preview-${question.id}`}
                          className="w-4 h-4 text-blue-500 border-gray-600 bg-gray-700"
                        />
                        <span className="text-gray-300">
                          {option || `Opción ${optionIndex + 1}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "multiple-select" && (
                  <div className="space-y-3">
                    {question.options?.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700/30 p-3 rounded-lg transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-500 border-gray-600 bg-gray-700 rounded"
                        />
                        <span className="text-gray-300">
                          {option || `Opción ${optionIndex + 1}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <textarea
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 resize-none"
                    rows="4"
                    disabled
                  />
                )}

                {question.type === "code" && (
                  <div>
                    <div className="relative">
                      <textarea
                        value={question.codeTemplate}
                        className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600/30 rounded-xl text-green-400 font-mono text-sm resize-none"
                        rows="6"
                        disabled
                      />
                      <div className="absolute top-3 right-3 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        Python
                      </div>
                    </div>
                    {question.testCases?.length > 0 && (
                      <div className="mt-3 text-sm text-gray-400 bg-gray-700/30 px-3 py-2 rounded-lg">
                        <strong className="text-green-400">
                          Casos de prueba:
                        </strong>{" "}
                        {question.testCases.length} configurados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExamPreview;
