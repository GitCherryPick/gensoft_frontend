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
    
    // Registrar submission
    try {
      await registerReplicationSubmission({
        user_id: solutionData.id_estudiante,
        exercise_id: solutionData.id_ejercicio,
        student_code: solutionData.codigo_fuente,
        typing_duration_seconds: solutionData.tiempo_redaccion || 0,
        errores_sintacticos: result.errores_sintacticos || [],
        ejecucion_simulada_exitosa: result.ejecucion_simulada_exitosa || false,
        estructura_igual_a_objetivo: result.estructura_igual_a_objetivo || false,
        puntaje_similitud: result.puntaje_similitud || 0,
        diferencias_detectadas: result.diferencias_detectadas || [],
        pistas_generadas: result.pistas_generadas || [],
        is_passed: result.estructura_igual_a_objetivo || false
      });
      console.log('Registro de sumisión completado');
    } catch (regError) {
      console.error('Error al registrar la sumisión:', regError);
    }
    
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

/**
 * Registra el histórico de sumisiones de ejercicios de replicación
 * @param {Object} submissionData - Datos de la sumisión
 * @param {string|number} submissionData.user_id - ID del estudiante
 * @param {string|number} submissionData.exercise_id - ID del ejercicio
 * @param {string} submissionData.student_code - Código enviado por el estudiante
 * @param {number} submissionData.typing_duration_seconds - Tiempo de escritura en segundos
 * @param {Array<string>} submissionData.errores_sintacticos - Errores sintácticos encontrados
 * @param {boolean} submissionData.ejecucion_simulada_exitosa - Si la ejecución simulada fue exitosa
 * @param {boolean} submissionData.estructura_igual_a_objetivo - Si la estructura coincide con el objetivo
 * @param {number} submissionData.puntaje_similitud - Puntaje de similitud (0-1)
 * @param {Array<string>} submissionData.diferencias_detectadas - Diferencias detectadas
 * @param {Array<string>} submissionData.pistas_generadas - Pistas generadas
 * @param {boolean} submissionData.is_passed - Si el ejercicio fue aprobado
 * @returns {Promise<Object>} - Resultado del registro
 */
async function registerReplicationSubmission(submissionData) {
  console.log('Registrando sumisión:', submissionData);
  try {
    const response = await fetch(`${TASK_API_BASE_URL}/replication-submissions/`, {
      method: 'POST',
      headers: defaultTaskHeaders,
      body: JSON.stringify(submissionData)
    });
    if (!response.ok) {
      throw new Error(`Error al registrar sumisión: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en registerReplicationSubmission:', error);
    throw error;
  }
}

/**
 * Obtiene el listado de sumisiones de ejercicios de replicación
 * @param {Object} [options] - Opciones de filtrado
 * @param {string|number} [options.userId] - Filtrar por ID de usuario/estudiante
 * @param {string|number} [options.exerciseId] - Filtrar por ID de ejercicio
 * @param {number} [options.limit=100] - Límite de resultados a obtener
 * @param {number} [options.skip=0] - Número de resultados a omitir (para paginación)
 * @returns {Promise<Array>} - Lista de sumisiones
 */
export async function getReplicationSubmissions(options = {}) {
  const { userId, exerciseId, limit = 100, skip = 0 } = options;
  let url = `${TASK_API_BASE_URL}/replication-submissions/?skip=${skip}&limit=${limit}`;
  if (userId) {
    url += `&user_id=${userId}`;
  }
  if (exerciseId) {
    url += `&exercise_id=${exerciseId}`;
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: defaultTaskHeaders
    });
    if (!response.ok) {
      throw new Error(`Error al obtener sumisiones: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error al obtener sumisiones:', error);
    throw error;
  }
}