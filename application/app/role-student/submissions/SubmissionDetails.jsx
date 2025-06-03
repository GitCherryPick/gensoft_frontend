"use client";

import { useState } from "react";
import { SANDBOX_API_BASE_URL } from "../../../lib/sandbox/sandbox-api-config";
import TestCaseResult from "../../../components/TestCaseResult";

export default function SubmissionDetails({ submission, onClose }) {
  const [activeTab, setActiveTab] = useState("details");

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = async (fileId) => {
    try {
      const response = await fetch(`${SANDBOX_API_BASE_URL}/submissions/${submission.id}/files/${fileId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `submission-${submission.id}-file-${fileId}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error al descargar el archivo");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{submission.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 ${activeTab === "details" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
            >
              Detalles
            </button>
            {submission.testCases && submission.testCases.length > 0 && (
              <button
                onClick={() => setActiveTab("testCases")}
                className={`px-4 py-2 ${activeTab === "testCases" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
              >
                Casos de Prueba
              </button>
            )}
          </div>
        </div>

        <div className="p-4">
          {activeTab === "details" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tarea</h3>
                  <p>{submission.taskTitle || "No especificada"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Entrega</h3>
                  <p>{formatDate(submission.date || submission.submittedAt)}</p>
                </div>

                {submission.status && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                    <p>{submission.status}</p>
                  </div>
                )}

                {submission.grade !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Calificación</h3>
                    <p className={`font-bold ${submission.grade >= 70 ? "text-green-600" : "text-red-600"}`}>
                      {submission.grade}/100
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-wrap">{submission.description}</p>
                </div>
              </div>

              {submission.feedback && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Retroalimentación del Profesor</h3>
                  <div className="mt-1 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="whitespace-pre-wrap">{submission.feedback}</p>
                  </div>
                </div>
              )}

              {submission.files && submission.files.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Archivos</h3>
                  <div className="mt-2 space-y-2">
                    {submission.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{typeof file === "string" ? file : file.name}</span>
                        </div>
                        <button
                          onClick={() => handleDownload(typeof file === "string" ? file : file.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "testCases" && submission.testCases && (
            <div className="space-y-4">
              <h3 className="font-medium">Resultados de los Casos de Prueba</h3>
              {submission.testCases.map((tc, i) => (
                <TestCaseResult
                  key={i}
                  testNumber={i + 1}
                  input={tc.input}
                  expectedOutput={tc.expectedOutput}
                  output={tc.output}
                  veredict={tc.veredict}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}