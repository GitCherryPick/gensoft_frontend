import { CONTENT_API_BASE_URL, defaultContentHeaders } from './content-api-config';
import { FuncionSepararListaVisiblesYPineadas } from '../../app/role-teacher/tasks/Functions';

// ------- 
// CURSOS
// -------

export async function getDefaultCourseId() {
  const response = await fetch(`${CONTENT_API_BASE_URL}/courses/default/id`, {
    headers: defaultContentHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el curso por defecto: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Default Course ID:', data.default_course_id);
  return data.default_course_id;
// 
//   "default_course_id": 1
//
}

export async function getDefaultCourse() {
  const courseId = await getDefaultCourseId();

  const response = await fetch(`${CONTENT_API_BASE_URL}/courses/${courseId}`, {
    headers: defaultContentHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error al obtener el curso con ID ${courseId}: ${response.statusText}`);
  }

  const courseData = await response.json();
  console.log('Default Course Data:', courseData);
  return courseData;

// 
//   "title": "string",
//   "description": "string",
//   "difficulty": "string",
//   "id": 0,
//   "created_at": "2025-05-09T02:26:54.729Z",
//   "updated_at": "2025-05-09T02:26:54.730Z"
//
}

// ------- 
// MODULOS
// -------

export async function getModulesByCourseId(courseId) {
  const response = await fetch(`${CONTENT_API_BASE_URL}/modules?course_id=${courseId}`, {
    headers: defaultContentHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error al obtener los módulos del curso con ID ${courseId}: ${response.statusText}`);
  }

  const modules = await response.json();
  console.log('Modules for Course ID', courseId, ':', modules);
  return modules;
//   [
//   {
//     "course_id": 0,
//     "title": "string",
//     "description": "string",
//     "level": "string",
//     "module_order": 0,
//     "id": 0
//   }
// ]
}

export async function createModule(moduleData) {
  const { course_id, title, description, level } = moduleData;
  const existingModules = await getModulesByCourseId(course_id);
  const nextOrder = existingModules.length > 0
    ? Math.max(...existingModules.map(m => m.module_order)) + 1
    : 1;

  const newModule = {
    course_id,
    title,
    description,
    level,
    module_order: nextOrder,
  };

  const response = await fetch(`${CONTENT_API_BASE_URL}/modules/`, {
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify(newModule),
  });

  if (!response.ok) {
    throw new Error(`Error al crear el módulo: ${response.statusText}`);
  }

  const createdModule = await response.json();
  console.log('Nuevo módulo creado:', createdModule);
  return createdModule;
}

export async function createTextContent(contentData) {
  const { module_id, content, title } = contentData;

  if (!module_id) {
    throw new Error("El ID del módulo es obligatorio");
  }

  if (!content) {
    throw new Error("El contenido de texto es obligatorio");
  }

  const response = await fetch(`${CONTENT_API_BASE_URL}/contents/text`, {
    method: 'POST',
    headers: defaultContentHeaders,
    body: JSON.stringify({
      module_id,
      content,
      title: title || "Contenido de texto",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error al crear contenido de texto: ${response.statusText}`);
  }

  const newContent = await response.json();
  console.log("Nuevo contenido de texto creado:", newContent);
  return newContent;
}

export async function getContentByModuleId(moduleId) {
  const response = await fetch(`${CONTENT_API_BASE_URL}/contents/module/${moduleId}`, {
    headers: defaultContentHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error al obtener contenidos del módulo: ${response.statusText}`);
  }

  const contents = await response.json();
  console.log("Contenidos del módulo:", contents);
  return contents;
}

export async function deleteContent(contentId) {
  const response = await fetch(`${CONTENT_API_BASE_URL}/contents/${contentId}`, {
    method: 'DELETE',
    headers: defaultContentHeaders,
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(`Error al eliminar el contenido: ${response.statusText}`);
  }

  console.log(`Contenido con ID ${contentId} eliminado exitosamente.`);
  return { success: true, message: "Contenido eliminado correctamente" };
}


//----------------------------


async function uploadFileContent(file, module_id, title = null, type) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('module_id', module_id);
  if (title) formData.append('title', title);

  const response = await fetch(`${CONTENT_API_BASE_URL}/contents/upload/${type}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error uploading ${type}: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`${type} upload response:`, data);
  return data;
}

// Funciones específicas
export async function uploadPdfContent(file, module_id, title = null) {
  return uploadFileContent(file, module_id, title, 'pdf');
}

export async function uploadImageContent(file, module_id, title = null) {
  return uploadFileContent(file, module_id, title, 'image');
}

export async function uploadVideoContent(file, module_id, title = null) {
  return uploadFileContent(file, module_id, title, 'video');
}

export async function uploadSlideContent(file, module_id, title = null) {
  return uploadFileContent(file, module_id, title, 'slide');
}


// ------------------------------


export async function createTaskWithDetails(taskData) {
  console.log('Datos de la tarea recibidos:', taskData);
  
  const requestBody = {
    instructor_id: parseInt(taskData.id_docente, 10) || 0,
    title: taskData.titulo || '',
    prompt: taskData.enunciado || '',
    target_code: taskData.codigo_objetivo || '',
    visible_lines: Array.isArray(taskData.lineas_visibles) ? taskData.lineas_visibles : [],
    instructor_comment: taskData.comentario_docente || ''
  };

  try {
    const response = await fetch(`${CONTENT_API_BASE_URL}/exercises/`, {
      method: 'POST',
      headers: defaultContentHeaders,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en la respuesta del servidor:', errorData);
      throw new Error(`Error al crear la tarea: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Tarea creada exitosamente:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    throw error;
  }
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
 * Convierte el formato de líneas visibles del backend al formato esperado por el frontend
 * @param {number[]} visibleLines - Array de números de línea que son visibles
 * @param {string} targetCode - Código completo del ejercicio
 * @returns {Array} Array de objetos con numero y contenido
 */
function convertirFormatoLineasVisibles(visibleLines, targetCode) {
  if (!visibleLines || !targetCode) return [];

  const lineasCodigo = targetCode.split('\n');

  return visibleLines.map(lineaHumana => {
    const index = lineaHumana - 1;
    return {
      numero: lineaHumana,
      contenido: lineasCodigo[index] || ''
    };
  });
}


/**
 * Obtiene los datos de un ejercicio por su ID
 * @param {number|string} exerciseId - ID del ejercicio a obtener
 * @returns {Promise<Object>} Promesa que se resuelve con los datos del ejercicio
 */
export async function getExerciseById(exerciseId) {
  try {
    const response = await fetch(`${CONTENT_API_BASE_URL}/exercises/${exerciseId}`, {
      headers: defaultContentHeaders,
    });
    if (!response.ok) {
      throw new Error(`Error al obtener el ejercicio: ${response.statusText}`);
    }
    const datosRecibidos = await response.json();
    console.log('Datos recibidos del API:', datosRecibidos);
    const ejercicioBackend = Array.isArray(datosRecibidos) ? datosRecibidos[0] : datosRecibidos;
    console.log('Ejercicio seleccionado:', ejercicioBackend);
    if (!ejercicioBackend || !ejercicioBackend.target_code) {
      throw new Error('Datos de ejercicio inválidos o incompletos');
    }
    // Dont try to understand this code.
    const { visibles, pineadas } = FuncionSepararListaVisiblesYPineadas(ejercicioBackend.visible_lines || []);
    const lineasVisiblesTransformadas = convertirFormatoLineasVisibles(
      visibles,
      ejercicioBackend.target_code
    );
    const ejercicio = {
      id_ejercicio: ejercicioBackend.exercise_id?.toString() || '0',
      titulo: ejercicioBackend.title || 'Sin título',
      enunciado: ejercicioBackend.prompt || 'Sin enunciado',
      lineas_visibles: lineasVisiblesTransformadas,
      lineas_fijadas: pineadas,
      codigo_objetivo: ejercicioBackend.target_code,
      comentario_docente: ejercicioBackend.instructor_comment || ''
    };
    const codigoBase = generarCodigoBase(ejercicio.lineas_visibles);
    const resultadoFinal = {
      ...ejercicio,
      codigo_base: codigoBase
    };
    console.log('Ejercicio retornado:', JSON.stringify(resultadoFinal));
    return resultadoFinal;
  } catch (error) {
    console.error('Error al obtener datos del ejercicio:', error);
    throw error;
  }
}

export async function createExerciseWithDetails(exerciseData) {
  console.log("Datos del ejercicio recibidos:", exerciseData)

  // Transformar los datos al formato requerido
  const requestBody = {
    instructor_id: Number.parseInt(exerciseData.id_docente, 10) || 0,
    title: exerciseData.titulo || "",
    enunciado: exerciseData.enunciado || "",
    pistas: exerciseData.pistas || [],
    tests: exerciseData.tests || [],
    // Mantener compatibilidad con el backend existente
    target_code: exerciseData.codigo_objetivo || "",
    visible_lines: Array.isArray(exerciseData.lineas_visibles) ? exerciseData.lineas_visibles : [],
    instructor_comment: exerciseData.comentario_docente || "",
  }

  try {
    const response = await fetch(`${CONTENT_API_BASE_URL}/exercises/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...defaultContentHeaders,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Error en la respuesta del servidor:", errorData)
      throw new Error(`Error al crear el ejercicio: ${response.status} - ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log("Ejercicio creado exitosamente:", responseData)
    return responseData
  } catch (error) {
    console.error("Error al crear el ejercicio:", error)
    throw error
  }
}
