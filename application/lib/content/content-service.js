import { CONTENT_API_BASE_URL, defaultContentHeaders } from './content-api-config';

const courses = [
  {
    id: 1,
    title: "Introducción a la Programacion",
    description: "Aprende lo básico",
    difficulty: "Principiante",
    created_at: new Date("2023-01-10T10:00:00Z"),
    updated_at: new Date("2023-01-11T11:00:00Z"),
  },
]

let modules = [
  {
    id: 1,
    course_id: 1,
    title: "Variables",
    description: "Tipos de datos",
    level: "1",
    module_order: 1,
  },
  {
    id: 2,
    course_id: 1,
    title: "Funciones",
    description: "Bloques de código",
    level: "1",
    module_order: 2,
  },
  {
    id: 3,
    course_id: 1,
    title: "Condicionales",
    description: "Control de flujo",
    level: "1",
    module_order: 3,
  },
]

let contents = [
  {
    id: 1,
    module_id: 1,
    content_type: "Video",
    title: "Video Variables",
    content: null,
    video_url: "/videos/variables.mp4",
    file_path: null,
    created_at: new Date("2023-01-10T12:00:00Z"),
  },
  {
    id: 2,
    module_id: 2,
    content_type: "Video",
    title: "Video Funciones",
    content: null,
    video_url: "/videos/functions.mp4",
    file_path: null,
    created_at: new Date("2023-01-11T14:00:00Z"),
  },
  {
    id: 3,
    module_id: 3,
    content_type: "Video",
    title: "Video Condicionales",
    content: null,
    video_url: "/videos/conditionals.mp4",
    file_path: null,
    created_at: new Date("2023-02-16T10:00:00Z"),
  },
]

async function simulateBackend(data) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return data
}

// export async function getAllCourses() {
//   return simulateBackend([...courses])
// }

// export async function getCourseById(courseId) {
//   const course = courses.find((course) => course.id === courseId) || null
//   return simulateBackend(course)
// }



export async function getModuleById(moduleId) {
  const module = modules.find((module) => module.id === moduleId) || null
  return simulateBackend(module)
}



export async function addContent(newContent) {
  const newId = Math.max(...contents.map((content) => content.id), 0) + 1

  const contentToAdd = {
    ...newContent,
    id: newId,
    created_at: new Date(),
  }

  const newContents = [...contents, contentToAdd]
  contents = newContents

  return simulateBackend(contentToAdd)
}



export async function reorderModule(moduleId, newOrder) {
  const moduleToMove = modules.find((module) => module.id === moduleId)
  if (!moduleToMove) return simulateBackend(false)

  const courseModules = modules.filter((module) => module.course_id === moduleToMove.course_id)
  const oldOrder = moduleToMove.module_order

  if (newOrder < 1 || newOrder > courseModules.length) return simulateBackend(false)

  if (oldOrder === newOrder) return simulateBackend(true)

  modules = modules.map((module) => {
    if (module.id === moduleId) {
      return { ...module, module_order: newOrder }
    } else if (module.course_id === moduleToMove.course_id) {
      if (oldOrder < newOrder && module.module_order > oldOrder && module.module_order <= newOrder) {
        return { ...module, module_order: module.module_order - 1 }
      } else if (oldOrder > newOrder && module.module_order >= newOrder && module.module_order < oldOrder) {
        return { ...module, module_order: module.module_order + 1 }
      }
    }
    return module
  })

  return simulateBackend(true)
}

export async function moveModuleUp(moduleId) {
  const module = modules.find((m) => m.id === moduleId)
  if (!module || module.module_order === 1) return simulateBackend(false)

  return reorderModule(moduleId, module.module_order - 1)
}

export async function moveModuleDown(moduleId) {
  const module = modules.find((m) => m.id === moduleId)
  if (!module) return simulateBackend(false)

  const courseModules = modules.filter((m) => m.course_id === module.course_id)
  if (module.module_order === courseModules.length) return simulateBackend(false)

  return reorderModule(moduleId, module.module_order + 1)
}

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



export async function createGenericContent(contentData) {
  const { module_id, content_type, title, content, video_url, file_path } = contentData

  if (!module_id) {
    throw new Error("El ID del módulo es obligatorio")
  }

  const moduleExists = modules.some((m) => m.id === module_id)
  if (!moduleExists) {
    throw new Error(`El módulo con ID ${module_id} no existe`)
  }

  const validTypes = ["text", "pdf", "image", "video", "slide", "url"]
  if (!validTypes.includes(content_type.toLowerCase())) {
    throw new Error(`Tipo de contenido '${content_type}' no válido. Debe ser uno de: ${validTypes.join(", ")}`)
  }

  if (content_type.toLowerCase() === "url" || content_type.toLowerCase() === "video") {
    if (video_url && !(video_url.startsWith("http://") || video_url.startsWith("https://"))) {
      throw new Error("La URL debe comenzar con http:// o https://")
    }
  }

  const newId = Math.max(...contents.map((c) => c.id), 0) + 1

  const newContent = {
    id: newId,
    module_id,
    content_type: content_type.toLowerCase(),
    title: title || `Contenido ${newId}`,
    content,
    video_url,
    file_path,
    created_at: new Date(),
  }

  contents = [...contents, newContent]

  return simulateBackend(newContent)
}


export async function createUrlContent(contentData) {
  const { module_id, url, title } = contentData

  if (!module_id) {
    throw new Error("El ID del módulo es obligatorio")
  }

  if (!url) {
    throw new Error("La URL es obligatoria")
  }

  if (!(url.startsWith("http://") || url.startsWith("https://"))) {
    throw new Error("La URL debe comenzar con http:// o https://")
  }

  const moduleExists = modules.some((m) => m.id === module_id)
  if (!moduleExists) {
    throw new Error(`El módulo con ID ${module_id} no existe`)
  }

  return createGenericContent({
    module_id,
    content_type: "url",
    title: title || "Contenido de URL",
    content: null,
    video_url: url,
    file_path: null,
  })
}