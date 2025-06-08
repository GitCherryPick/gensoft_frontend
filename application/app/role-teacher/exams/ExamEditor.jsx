"use client";
import React, { useRef, useCallback } from "react";
import { Plus, Trash2, Play, CheckCircle, XCircle } from "lucide-react";
import { questionTypes } from "./questionTypes";
import dynamic from "next/dynamic";

// Importación dinámica del editor de código
const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
);

const ExamEditor = ({ exam, setExam }) => {
  const editorRefs = useRef({});

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
        type === "code" || type === "CodeWithTest"
          ? "# Escribe tu código aquí\n# Ejemplo: definir una función que sume dos números\n\ndef sumar(a, b):\n    # Tu código aquí\n    pass\n\n# Prueba tu función\nprint(sumar(5, 3))"
          : null,
      testCases: type === "code" || type === "CodeWithTest" ? [] : null,
      codigoObjetivo:
        type === "Replication"
          ? `# Ejemplo de script Python\ndef suma(a, b):\n    \"\"\"Devuelve la suma de dos números\"\"\"\n    return a + b\n\nresultado = suma(3, 4)\nprint(f\"La suma es: {resultado}\")\n`
          : null,
      lineasVisibles: type === "Replication" ? [] : null,
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
    delete editorRefs.current[questionId];

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

  // Funciones para manejar test cases
  const addTestCase = (questionId) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question) {
      const newTestCase = {
        id: Date.now(),
        name: `Caso de prueba ${question.testCases.length + 1}`,
        input: "",
        expectedOutput: "",
        description: "",
        isVisible: true,
        points: 1,
      };
      updateQuestion(questionId, {
        testCases: [...question.testCases, newTestCase],
      });
    }
  };

  const updateTestCase = (questionId, testCaseId, updates) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question) {
      const newTestCases = question.testCases.map((tc) =>
        tc.id === testCaseId ? { ...tc, ...updates } : tc
      );
      updateQuestion(questionId, { testCases: newTestCases });
    }
  };

  const deleteTestCase = (questionId, testCaseId) => {
    const question = exam.questions.find((q) => q.id === questionId);
    if (question) {
      const newTestCases = question.testCases.filter(
        (tc) => tc.id !== testCaseId
      );
      updateQuestion(questionId, { testCases: newTestCases });
    }
  };

  // Función para actualizar las líneas visibles en el estado
  const updateVisibleLines = useCallback((questionId) => {
    const visibleLines =
      editorRefs.current[questionId]?.getVisibleLines?.() || [];
    updateQuestion(questionId, { lineasVisibles: visibleLines });
  }, []);

  // Función para manejar cambios en el código
  const handleCodeChange = useCallback((questionId, code) => {
    updateQuestion(questionId, { codigoObjetivo: code });
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setExam((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
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
            placeholder={
              question.type === "Replication"
                ? "Título del ejercicio de réplica"
                : "¿Cuál es tu pregunta?"
            }
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />

          <textarea
            placeholder={
              question.type === "Replication"
                ? "Describe qué debe hacer el estudiante e indica los conceptos o métodos que se deben usar (ej: Se debe usar el operador ternario y la función map())"
                : "Descripción o instrucciones adicionales (opcional)"
            }
            value={question.description}
            onChange={(e) =>
              updateQuestion(question.id, { description: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
            rows={question.type === "Replication" ? "4" : "2"}
          />

          {/* OPCION MULTIPLE Y UNICA OPCION */}
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

          {/* PRUEBAS DE CÓDIGO CON TEST CASES */}
          {question.type === "CodeWithTest" && (
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Play className="text-green-400" size={20} />
                  <span>Configuración de Casos de Prueba</span>
                </h4>
                <p className="text-gray-400 text-sm mb-6">
                  Define los casos de prueba que se ejecutarán automáticamente
                  para evaluar el código del estudiante.
                </p>

                {/* Lista de casos de prueba */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-md font-medium text-white">
                      Casos de Prueba
                    </h5>
                    <button
                      onClick={() => addTestCase(question.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <Plus size={16} />
                      <span>Agregar caso</span>
                    </button>
                  </div>

                  {/* Mostrar mensaje cuando no hay casos de prueba */}
                  {(!question.testCases || question.testCases.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-600/50 rounded-lg">
                      <div className="text-gray-500 mb-4">
                        <Play size={32} className="mx-auto opacity-50" />
                      </div>
                      <p className="text-gray-400 mb-2">
                        No hay casos de prueba definidos
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        Agrega al menos un caso de prueba para evaluar el código
                        del estudiante
                      </p>
                      <button
                        onClick={() => addTestCase(question.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 mx-auto"
                      >
                        <Plus size={16} />
                        <span>Agregar primer caso</span>
                      </button>
                    </div>
                  )}

                  {question.testCases?.map((testCase, testIndex) => (
                    <div
                      key={testCase.id}
                      className="bg-gray-800/50 rounded-lg p-5 border border-gray-600/30 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {testIndex + 1}
                          </div>
                          <input
                            type="text"
                            placeholder="Nombre del caso de prueba"
                            value={testCase.name}
                            onChange={(e) =>
                              updateTestCase(question.id, testCase.id, {
                                name: e.target.value,
                              })
                            }
                            className="bg-transparent text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={testCase.isVisible}
                              onChange={(e) =>
                                updateTestCase(question.id, testCase.id, {
                                  isVisible: e.target.checked,
                                })
                              }
                              className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 rounded"
                            />
                            <span className="text-gray-300 text-sm">
                              Visible
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gray-700/50 rounded px-2 py-1">
                            <input
                              type="number"
                              value={testCase.points}
                              onChange={(e) =>
                                updateTestCase(question.id, testCase.id, {
                                  points: parseInt(e.target.value) || 1,
                                })
                              }
                              className="w-12 bg-transparent text-white text-center border-none focus:outline-none"
                              min="1"
                            />
                            <span className="text-gray-400 text-xs">pts</span>
                          </div>
                          <button
                            onClick={() =>
                              deleteTestCase(question.id, testCase.id)
                            }
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Entrada
                          </label>
                          <textarea
                            placeholder="Parámetros de entrada ej: 5, 3"
                            value={testCase.input}
                            onChange={(e) =>
                              updateTestCase(question.id, testCase.id, {
                                input: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none text-sm font-mono"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Salida esperada
                          </label>
                          <textarea
                            placeholder="Resultado esperado ej: 8"
                            value={testCase.expectedOutput}
                            onChange={(e) =>
                              updateTestCase(question.id, testCase.id, {
                                expectedOutput: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none text-sm font-mono"
                            rows="3"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Descripción del caso (opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Descripción de qué verifica este caso de prueba"
                          value={testCase.description}
                          onChange={(e) =>
                            updateTestCase(question.id, testCase.id, {
                              description: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
                        />
                      </div>

                      {/* Indicador de visibilidad */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
                        <div className="flex items-center space-x-2">
                          {testCase.isVisible ? (
                            <>
                              <CheckCircle
                                className="text-green-400"
                                size={16}
                              />
                              <span className="text-green-400 text-sm">
                                Visible para el estudiante
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-orange-400" size={16} />
                              <span className="text-orange-400 text-sm">
                                Caso oculto
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs">
                          {testCase.points} punto
                          {testCase.points !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de casos de prueba - solo mostrar si hay casos */}
                {question.testCases && question.testCases.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 font-medium">
                          Resumen de casos de prueba
                        </p>
                        <p className="text-blue-400/70 text-sm">
                          {question.testCases?.filter((tc) => tc.isVisible)
                            .length || 0}{" "}
                          visibles,{" "}
                          {question.testCases?.filter((tc) => !tc.isVisible)
                            .length || 0}{" "}
                          ocultos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-300 font-medium">
                          {question.testCases?.reduce(
                            (sum, tc) => sum + tc.points,
                            0
                          ) || 0}{" "}
                          pts totales
                        </p>
                        <p className="text-blue-400/70 text-sm">
                          {question.testCases?.length || 0} caso
                          {question.testCases?.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* REPLICACION */}
          {question.type === "Replication" && (
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Código Objetivo
                </h4>
                <p className="text-gray-400 text-sm mb-6">
                  Define el código que el estudiante debe replicar. Usa los
                  controles del editor para seleccionar qué líneas serán
                  visibles inicialmente.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Editor de código
                    </label>
                    <div className="h-80 border border-gray-600/50 rounded-lg overflow-hidden">
                      <CodeEditorCopy
                        ref={(ref) => {
                          if (ref) {
                            editorRefs.current[question.id] = ref;
                          }
                        }}
                        codeInput={question.codigoObjetivo || ""}
                        setCodeInput={(code) =>
                          handleCodeChange(question.id, code)
                        }
                        showLineVisibilityToggle={true}
                        onVisibilityChange={() => {
                          setTimeout(
                            () => updateVisibleLines(question.id),
                            100
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => updateVisibleLines(question.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Actualizar líneas visibles
                    </button>

                    <div className="text-right">
                      <p className="text-blue-300 text-sm">
                        <strong>Líneas visibles:</strong>{" "}
                        {question.lineasVisibles?.length || 0} líneas
                        seleccionadas
                      </p>
                      <p className="text-blue-400/70 text-xs mt-1">
                        Haz clic en "Actualizar" después de seleccionar líneas
                      </p>
                    </div>
                  </div>

                  {/* Mostrar las líneas visibles seleccionadas */}
                  {question.lineasVisibles &&
                    question.lineasVisibles.length > 0 && (
                      <div className="mt-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
                        <p className="text-green-300 text-sm font-medium mb-2">
                          Líneas que verá el estudiante:
                        </p>
                        <div className="text-green-400/80 text-xs space-y-1">
                          {question.lineasVisibles.map((lineNum, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <span className="text-green-300 font-mono">
                                Línea {lineNum}:
                              </span>
                              <span className="font-mono bg-gray-800/50 px-2 py-1 rounded">
                                {question.codigoObjetivo?.split("\n")[
                                  lineNum - 1
                                ] || ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
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
            Personaliza tu examen
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
