import { TASK_API_BASE_URL, defaultTaskHeaders } from "./task-api-config";

export async function getAllTaskCodes() {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode`, {
    method: 'POST',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    method: 'PUT',
    headers: defaultTaskHeaders,
    body: JSON.stringify(taskData),
  });
  return response.json();
}

export async function deleteTask(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    method: 'DELETE',
    headers: defaultTaskHeaders,
  });
  return response.json();
}   

export async function getTaskReferenceCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function getTaskTemplateCode(taskId) {
  const response = await fetch(`${TASK_API_BASE_URL}/taskcode/${taskId}/template`, {
    headers: defaultTaskHeaders,
  });
  return response.json();
}

export async function compareTaskCode(taskId, studentCode) {
  const response = await fetch(`${TASK_API_BASE_URL}/codereplicated`, {
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
 * Evalúa la solución de un estudiante para un ejercicio de réplica
 * @param {Object} solutionData - Datos de la solución del estudiante
 * @param {string} solutionData.id_estudiante - ID del estudiante
 * @param {string} solutionData.id_ejercicio - ID del ejercicio
 * @param {string} solutionData.codigo_fuente - Código fuente del estudiante
 * @param {number} solutionData.tiempo_redaccion - Tiempo en segundos que tomó escribir la solución
 * @returns {Promise<Object>} Resultado de la evaluación con análisis detallado
 */
export async function evaluateStudentSolution(solutionData) {
  console.log('Datos recibidos en evaluateStudentSolution:', solutionData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        errores_sintacticos: [],
        ejecucion_simulada_exitosa: true,
        salida_estandar: "",
        estructura_igual_a_objetivo: false,
        puntaje_similitud: 0.68,
        diferencias_detectadas: [
          "El estudiante no declaró la variable 'res'.",
          "El resultado se retorna directamente en lugar de guardarse en una variable."
        ],
        pistas_generadas: [
          "¿Estás usando una variable para guardar el resultado antes del return?",
          "Tal vez podrías declarar una variable llamada 'res' justo antes del return."
        ]
      });
    }, 2900);
  });
}
