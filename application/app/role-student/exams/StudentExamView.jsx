"use client";
import React, { useState, useRef, useCallback } from "react";
import { CheckCircle, XCircle, Play } from "lucide-react";
import { questionTypes } from "./questionTypes";
import { examResponse } from "@/lib/sandbox/sandbox-service"
import dynamic from "next/dynamic";

// Dynamic import for CodeEditorCopy
const CodeEditorCopy = dynamic(
  () => import("@/components/core/CodeEditorCopy"),
  { ssr: false }
);

const StudentExamView = ({ exam = { questions: [], title: "Examen" } }) => {
  const [answers, setAnswers] = useState({});
  const [testResults, setTestResults] = useState({});
  const editorRefs = useRef({});

  // Manejo de respuestas para preguntas de opción múltiple y única
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Manejo de código
  const handleCodeChange = (questionId, code) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: code,
    }));
  };

  // Simulador de test
  const runTestCases = (questionId, code) => {
    const question = exam.questions.find((q) => q.question_id === questionId);
    if (!question || !question.testCases) return;

    const results = question.testCases.map((testCase, index) => {
      const mockOutput = "8"; 
      const passed = mockOutput === testCase.expectedOutput;
      return {
        id: testCase.id,
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: mockOutput,
        isVisible: testCase.isVisible,
      };
    });

    setTestResults((prev) => ({
      ...prev,
      [questionId]: results,
    }));
  };

  // Handle exam submission
  const handleSubmit = () => {
    const submission = {
      exam_id: exam.exam_id,
      student_id: exam.student_id || 0,
      question_responses: Object.entries(answers).map(([questionId, answer]) => {
        const question = exam.questions.find(q => q.question_id === parseInt(questionId));
        return {
          question_id: parseInt(questionId),
          answer:
            question?.type === "single_choice"
              ? question.options[answer]?.text ?? ""
              : typeof answer === "string"
              ? answer
              : "",
          answers: Array.isArray(answer)
            ? answer.map(idx => question.options[idx]?.text ?? "")
            : [],
          code_solution: question?.type.includes('code') ? answer : '',
          is_correct: true, // Esto se calculará en el backend
          points_earned: 0 // Esto se calculará en el backend
        };
      }),
      total_score: 0
    }
    console.log("Submitting exam:", submission);
    const response = examResponse(submission);
    console.log("Exam submitted:", response);
    alert("Examen enviado con éxito!");
  };

  const renderQuestion = (question, index) => {
    const questionType = questionTypes.find((t) => t.type === question.type);

    return (
      <div
        key={question.question_id}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`bg-gradient-to-r ${questionType?.gradient} p-3 rounded-xl text-white shadow-lg`}
            >
              <span className="font-bold text-lg">{index + 1}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {question.title || "Pregunta sin título"}
              </h3>
              <p className="text-gray-400 text-sm">{questionType?.label}</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">{question.points} pts</div>
        </div>

        {question.description && (
          <p className="text-gray-300 mb-6">{question.description}</p>
        )}

        {/* SINGLE CHOICE */}
        {question.type === "single_choice" && question.options && (
          <div className="space-y-3 mb-6">
            {question.options.map((option, optionIndex) => (
              <div key={option.option_id || optionIndex} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${question.question_id}`}
                  value={optionIndex}
                  checked={answers[question.question_id] === optionIndex}
                  onChange={() => handleAnswerChange(question.question_id, optionIndex)}
                  className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white">{option.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* MULTIPLE CHOICE  */}
        {question.type === "multiple_choice" && question.options && (
          <div className="space-y-3 mb-6">
            {question.options.map((option, optionIndex) => (
              <div key={option.option_id || optionIndex} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={answers[question.question_id]?.includes(optionIndex) || false}
                  onChange={(e) => {
                    const currentAnswers = answers[question.question_id] || [];
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, optionIndex]
                      : currentAnswers.filter((i) => i !== optionIndex);
                    handleAnswerChange(question.question_id, newAnswers);
                  }}
                  className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 rounded"
                />
                <span className="text-white">{option.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* CODE IMPLEMENTATION  */}
        {question.type === "code_implementation" && (
          <div className="space-y-6">
            <div className="h-80 border border-gray-600/50 rounded-lg overflow-hidden">
              <CodeEditorCopy
                ref={(ref) => {
                  if (ref) editorRefs.current[question.question_id] = ref;
                }}
                codeInput={answers[question.question_id] || question.codeTemplate || ""}
                setCodeInput={(code) => handleCodeChange(question.question_id, code)}
              />
            </div>
            <button
              onClick={() => runTestCases(question.question_id, answers[question.question_id])}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <Play size={16} />
              <span>Ejecutar pruebas</span>
            </button>

            {testResults[question.question_id] && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Resultados de las pruebas
                </h4>
                {testResults[question.question_id]
                  .filter((result) => result.isVisible)
                  .map((result, index) => (
                    <div
                      key={result.id}
                      className={`p-4 rounded-lg border ${
                        result.passed
                          ? "border-green-600 bg-green-900/20"
                          : "border-red-600 bg-red-900/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {result.passed ? (
                            <CheckCircle className="text-green-400" size={16} />
                          ) : (
                            <XCircle className="text-red-400" size={16} />
                          )}
                          <span className="text-white">
                            Caso de prueba {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          Entrada: {result.input}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-gray-300">
                          Salida esperada: {result.expectedOutput}
                        </p>
                        <p className="text-gray-300">
                          Salida obtenida: {result.actualOutput}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* CODE REPLICATION  */}
        {question.type === "code_replication" && (
          <div className="space-y-6">
            {question.lineasVisibles?.length > 0 && (
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">
                  Líneas visibles a replicar:
                </h4>
                <div className="text-gray-300 font-mono text-sm space-y-1">
                  {question.lineasVisibles.map((lineNum, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span>Línea {lineNum}:</span>
                      <span className="bg-gray-800/50 px-2 py-1 rounded">
                        {question.codigoObjetivo?.split("\n")[lineNum - 1] || ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="h-80 border border-gray-600/50 rounded-lg overflow-hidden">
              <CodeEditorCopy
                ref={(ref) => {
                  if (ref) editorRefs.current[question.question_id] = ref;
                }}
                codeInput={answers[question.question_id] || question.codeTemplate || ""}
                setCodeInput={(code) => handleCodeChange(question.question_id, code)}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {exam?.title || "Examen"}
      </h2>
      {!exam || !exam.questions || exam.questions.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>No hay preguntas disponibles en este examen.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {exam.questions.map((question, index) => renderQuestion(question, index))}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-colors duration-200"
            >
              Enviar examen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExamView;
