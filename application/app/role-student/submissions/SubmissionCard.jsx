"use client";

import { useState } from "react";
import { SANDBOX_API_BASE_URL } from "../../../lib/sandbox/sandbox-api-config";
import SubmissionDetails from "./SubmissionDetails";
import SubmissionForm from "./SubmissionForm";

export default function SubmissionCard({ submission }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta entrega?")) {
      try {
        const response = await fetch(`${SANDBOX_API_BASE_URL}/submissions/${submission.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Entrega eliminada");
          // Recargar la página para actualizar la lista
          window.location.reload();
        } else {
          alert("Error al eliminar la entrega");
        }
      } catch (error) {
        console.error("Error deleting submission:", error);
        alert("Error al eliminar la entrega");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pendiente" },
      submitted: { color: "bg-blue-100 text-blue-800", text: "Entregado" },
      graded: { color: "bg-green-100 text-green-800", text: "Calificado" },
      late: { color: "bg-red-100 text-red-800", text: "Tardío" },
    };

    const config = statusConfig[status] || { color: "bg-gray-100 text-gray-800", text: status };

    return <span className={`${config.color} px-2 py-1 rounded-full text-xs font-medium`}>{config.text}</span>;
  };

  return (
    <>
      <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold">{submission.title}</h2>
          {getStatusBadge(submission.status)}
        </div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{submission.description}</p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(submission.date || submission.submittedAt)}</span>
        </div>

        {submission.taskTitle && (
          <div className="mb-3 text-sm">
            <span className="font-medium">Tarea: </span>
            <span className="text-gray-700">{submission.taskTitle}</span>
          </div>
        )}

        {submission.grade !== undefined && (
          <div className="mb-3 text-sm">
            <span className="font-medium">Calificación: </span>
            <span className={`font-bold ${submission.grade >= 70 ? "text-green-600" : "text-red-600"}`}>
              {submission.grade}/100
            </span>
          </div>
        )}

        <div className="flex space-x-2 mt-3 pt-3 border-t">
          <button
            onClick={() => setShowDetails(true)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Ver Detalles
          </button>

          {submission.status === "pending" && (
            <button
              onClick={() => setShowEditForm(true)}
              className="text-green-500 hover:text-green-700 text-sm font-medium"
            >
              Editar
            </button>
          )}

          <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm font-medium ml-auto">
            Eliminar
          </button>
        </div>
      </div>

      {showDetails && <SubmissionDetails submission={submission} onClose={() => setShowDetails(false)} />}

      {showEditForm && (
        <SubmissionForm
          submission={submission}
          onClose={() => {
            setShowEditForm(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}