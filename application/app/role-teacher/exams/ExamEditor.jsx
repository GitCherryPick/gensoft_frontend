"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { questionTypes } from "./questionTypes";

const ExamEditor = ({ exam, setExam }) => {
  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      title: "",
      description: "",
      points: 1,
      required: true,
      options:
        type === "multiple-choice" || type === "multiple-select"
          ? ["", ""]
          : null,
      correctAnswers:
        type === "multiple-choice" ? "" : type === "multiple-select" ? [] : "",
      codeTemplate:
        type === "code"
          ? "# Escribe tu código aquí\n# Ejemplo: definir una función que sume dos números\n\ndef sumar(a, b):\n    # Tu código aquí\n    pass\n\n# Prueba tu función\nprint(sumar(5, 3))"
          : null,
      testCases:
        type === "code"
          ? [{ input: "5, 3", expectedOutput: "8", description: "Suma básica" }]
          : null,
    };

    setExam((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (questionId, updates) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    }));
  };

  const deleteQuestion = (questionId) => {
    setExam((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const addOption = (questionId) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question) {
      updateQuestion(questionId, {
        options: [...question.options, ""],
      });
    }
  };

  const updateOption = (questionId, optionIndex, value) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId, optionIndex) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question && question.options.length > 2) {
      const newOptions = question.options.filter(
        (_, index) => index !== optionIndex
      );
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const renderQuestionEditor = (question, index) => {
    const questionType = questionTypes.find((t) => t.type === question.type);

    return (
      <div
        key={question.id}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-6 hover:bg-gray-800/70 transition-all duration-300 group"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`bg-gradient-to-r ${questionType?.gradient} p-3 rounded-xl text-white shadow-lg`}
            >
              <span className="font-bold text-lg">{index + 1}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {questionType?.icon}
                <span className="text-gray-300 font-medium">
                  {questionType?.label}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {questionType?.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-700/50 rounded-lg px-3 py-2">
              <input
                type="number"
                value={question.points}
                onChange={(e) =>
                  updateQuestion(question.id, {
                    points: parseInt(e.target.value) || 1,
                  })
                }
                className="w-16 bg-transparent text-white text-center border-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                min="1"
              />
              <span className="text-gray-400 text-sm">pts</span>
            </div>
            <button
              onClick={() => deleteQuestion(question.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="¿Cuál es tu pregunta?"
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />

          <textarea
            placeholder="Descripción o instrucciones adicionales (opcional)"
            value={question.description}
            onChange={(e) =>
              updateQuestion(question.id, { description: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
            rows="2"
          />

          {/* Opciones para preguntas de opción múltiple */}
          {(question.type === "multiple-choice" ||
            question.type === "multiple-select") && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span>Opciones de respuesta:</span>
              </label>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center space-x-3 group/option"
                >
                  <div className="flex-shrink-0">
                    {question.type === "multiple-choice" ? (
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswers === optionIndex}
                        onChange={() =>
                          updateQuestion(question.id, {
                            correctAnswers: optionIndex,
                          })
                        }
                        className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={question.correctAnswers.includes(optionIndex)}
                        onChange={(e) => {
                          const newCorrect = e.target.checked
                            ? [...question.correctAnswers, optionIndex]
                            : question.correctAnswers.filter(
                                (i) => i !== optionIndex
                              );
                          updateQuestion(question.id, {
                            correctAnswers: newCorrect,
                          });
                        }}
                        className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 rounded"
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={`Opción ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      updateOption(question.id, optionIndex, e.target.value)
                    }
                    className="flex-1 px-4 py-3 bg-gray-700/30 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  />
                  {question.options.length > 2 && (
                    <button
                      onClick={() => removeOption(question.id, optionIndex)}
                      className="opacity-0 group-hover/option:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addOption(question.id)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-2 hover:bg-blue-400/10 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <Plus size={16} />
                <span>Agregar opción</span>
              </button>
            </div>
          )}

          {question.type === "CodeWithTest" && (
            <div className="space-y-6">
              <p>Aca entra de Mateo</p>
            </div>
          )}

          {question.type === "Replication" && (
            <div>
              <p>Aca entra de Replica</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Add Question Buttons */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            Construye tu examen
          </h3>
          <p className="text-gray-400">
            Elige el tipo de pregunta que quieres agregar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {questionTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => addQuestion(type.type)}
              className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`bg-gradient-to-r ${type.gradient} p-4 rounded-xl text-white shadow-lg mb-4 mx-auto w-fit`}
                >
                  {type.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  {type.label}
                </h4>
                <p className="text-gray-400 text-sm">{type.description}</p>
                <div className="mt-4 flex items-center justify-center text-gray-500 group-hover:text-gray-400 transition-colors">
                  <Plus size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div>
        {exam.questions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-600 mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-8 w-32 h-32 mx-auto flex items-center justify-center mb-4">
                <Plus size={48} className="text-gray-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              ¡Comienza a crear!
            </h3>
            <p className="text-gray-400 text-lg">
              Tu examen está esperando. Agrega tu primera pregunta usando los
              botones de arriba.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Preguntas</span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {exam.questions.length}
                </span>
              </h3>
              <div className="text-gray-400 text-sm">
                Total: {exam.questions.reduce((sum, q) => sum + q.points, 0)}{" "}
                puntos
              </div>
            </div>
            {exam.questions.map((question, index) =>
              renderQuestionEditor(question, index)
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExamEditor;
