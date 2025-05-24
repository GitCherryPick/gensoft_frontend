import { CONTENT_API_BASE_URL, defaultContentHeaders } from './content-api-config';

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
