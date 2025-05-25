import { TASK_API_BASE_URL, defaultTaskHeaders } from "./task-api-config";

export async function getAllTaskCodes() {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode/?skip=0&limit=100`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode`, {
    method: 'POST',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode/${taskId}`, {
    method: 'PUT',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode/${taskId}`, {
    method: 'DELETE',
    headers: defaultTaskHeaders,
  });
  return response.json();
}   

export async function getTaskReferenceCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode/${taskId}`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function getTaskTemplateCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/taskcode/${taskId}/template`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function compareTaskCode(taskId, studentCode) {
  const response = await fetch(`${TASK_API_BASE_URL}/sandbox/codereplicated`, {
    method: 'POST',
    headers: defaultTaskHeaders,
    body: JSON.stringify({
      task_replicator_id: taskId,
      student_code: studentCode
    }),
  });
  return response.json();
}   

// ----------------------------------

/**
 * Crea una nueva tarea con los detalles proporcionados
 * @param {Object} taskData - Objeto con los datos de la tarea
 * @param {string} taskData.id_docente - ID del docente que crea la tarea
 * @param {string} taskData.titulo - Título de la tarea
 * @param {string} taskData.enunciado - Enunciado completo de la tarea
 * @param {string} taskData.codigo_objetivo - Código de ejemplo que cumple con el objetivo
 * @param {number[]} taskData.lineas_visibles - Array con los números de línea que deben ser visibles
 * @param {string} taskData.comentario_docente - Comentarios adicionales del docente
 * @returns {Promise<Object>} Promesa que se resuelve con la respuesta del servidor
 */
export async function createTaskWithDetails(taskData) {
  console.log('Datos de la tarea recibidos:', taskData);
  // Simulando una respuesta exitosa
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Tarea creada exitosamente'
      });
    }, 500); // Simulamos un pequeño retraso de red
  });
}

