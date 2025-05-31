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
 * {
 *   codigo_fuente: "código_del_estudiante",
 *   codigo_objetivo: "código_objetivo_completo",
 *   consignas_docente: "Descripción del ejercicio que ve el estudiante",
 *   contexto_ejercicio: "Información adicional para el contexto del ejercicio",
 *   id_ejercicio: "identificador_del_ejercicio",
 *   id_estudiante: "identificador_del_estudiante",
 *   tiempo_redaccion: 10 // tiempo en segundos
 * }
 */
export async function evaluateStudentSolution(solutionData) {
  console.log('Datos recibidos en evaluateStudentSolution:', solutionData);
  try {
    const response = await fetch(`${TASK_API_BASE_URL}/sandbox/ai-feedback/replicator`, {
      method: 'POST',
      headers: defaultTaskHeaders,
      body: JSON.stringify({
        codigo_estudiante: solutionData.codigo_fuente,
        codigo_objetivo: solutionData.codigo_objetivo,
        consignas_docente: solutionData.consignas_docente,
        contexto_ejercicio: solutionData.contexto_ejercicio || ''
      })
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    console.log('Respuesta del servidor de evaluación:', result);
    return result;
  } catch (error) {
    console.error('Error al evaluar la solución:', error);
    return {
      errores_sintacticos: [],
      ejecucion_simulada_exitosa: false,
      salida_estandar: "",
      estructura_igual_a_objetivo: false,
      puntaje_similitud: 0,
      diferencias_detectadas: ["Error al procesar la evaluación"],
      pistas_generadas: ["Ocurrió un error al evaluar tu solución. Por favor, inténtalo de nuevo más tarde."]
    };
  }
}

/**
 * Obtiene la lista de ejercicios de tipo réplica
 * @returns {Promise<Array>} Lista de ejercicios con sus detalles
 */
export async function getReplicaExercises() {
  const response = await fetch(`${TASK_API_BASE_URL}/exercises/`, {
    method: 'GET',
    headers: defaultTaskHeaders,
  });
  
  if (!response.ok) {
    throw new Error(`Error al obtener los ejercicios: ${response.statusText}`);
  }
  
  return response.json();
}
