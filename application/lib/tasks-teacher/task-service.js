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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Tarea creada exitosamente'
      });
    }, 700);
  });
}

/**
 * Genera el código base a partir de las líneas visibles
 * @param {Array} lineasVisibles - Array de objetos con número y contenido de líneas visibles
 * @returns {string} Código formateado con saltos de línea
 */
function generarCodigoBase(lineasVisibles) {
  if (!lineasVisibles || lineasVisibles.length === 0) return '';
  const lineasOrdenadas = [...lineasVisibles].sort((a, b) => a.numero - b.numero);
  const maxLinea = lineasOrdenadas[lineasOrdenadas.length - 1].numero;
  const lineas = [];
  let indiceLinea = 0;
  for (let i = 1; i <= maxLinea; i++) {
    if (indiceLinea < lineasOrdenadas.length && lineasOrdenadas[indiceLinea].numero === i) {
      lineas.push(lineasOrdenadas[indiceLinea].contenido);
      indiceLinea++;
    } else {
      lineas.push('');
    }
  }
  return lineas.join('\n');
}

/**
 * Obtiene los datos de un ejercicio por su ID
 * @param {string} exerciseId - ID del ejercicio a obtener
 * @returns {Promise<Object>} Promesa que se resuelve con los datos del ejercicio
 */
export async function getExerciseById(exerciseId) {
  // Datos de respuesta
  const ejercicio = {
    id_ejercicio: "001",
    titulo: "Suma de dos números",
    enunciado: "Define una función llamada `sumar` que reciba dos parámetros y devuelva la suma. \nLa suma debe almacenarse en una variable llamada `res`, y esta debe ser retornada.",
    lineas_visibles: [
      {
        numero: 2,
        contenido: "    res = a + b"
      },
      {
        numero: 7,
        contenido: "}"
      }
    ]
  };
  
  // Generar el código base
  const codigoBase = generarCodigoBase(ejercicio.lineas_visibles);
  
  // Respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...ejercicio,
        codigo_base: codigoBase
      });
    }, 700);
  });
}
