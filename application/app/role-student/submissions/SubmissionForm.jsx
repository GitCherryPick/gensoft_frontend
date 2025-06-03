"use client";

import { useState, useEffect } from "react";
import { SANDBOX_API_BASE_URL } from "../../../lib/sandbox/sandbox-api-config";

export default function SubmissionForm({ submission, onClose }) {
  const [title, setTitle] = useState(submission?.title || "");
  const [description, setDescription] = useState(submission?.description || "");
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(submission?.taskId || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!submission;

  useEffect(() => {
    // Cargar las tareas disponibles
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks/available`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!selectedTaskId) {
      newErrors.taskId = "Debes seleccionar una tarea";
    }

    if (!isEditing && !file) {
      newErrors.file = "Debes adjuntar al menos un archivo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("taskId", selectedTaskId);

    if (file) {
      formData.append("file", file);
    }

    try {
      const url = isEditing
        ? `${SANDBOX_API_BASE_URL}/submissions/${submission.id}`
        : `${SANDBOX_API_BASE_URL}/submissions`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      if (response.ok) {
        alert(isEditing ? "Entrega actualizada" : "Entrega guardada");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "No se pudo guardar la entrega"}`);
      }
    } catch (error) {
      console.error("Error saving submission:", error);
      alert("Error al guardar la entrega");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{isEditing ? "Editar Entrega" : "Nueva Entrega"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tarea</label>
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className={`w-full border p-2 rounded ${errors.taskId ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Selecciona una tarea</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
            {errors.taskId && <p className="text-red-500 text-xs mt-1">{errors.taskId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
              placeholder="Título de tu entrega"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full border p-2 rounded h-24 ${errors.description ? "border-red-500" : "border-gray-300"}`}
              placeholder="Describe tu entrega, metodología utilizada, resultados obtenidos, etc."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Archivo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={`w-full border p-2 rounded ${errors.file ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            {isEditing && !file && (
              <p className="text-xs text-gray-500 mt-1">
                Deja este campo vacío si no quieres cambiar el archivo actual.
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}