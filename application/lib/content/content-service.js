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

export async function getAllCourses() {
  return simulateBackend([...courses])
}

export async function getCourseById(courseId) {
  const course = courses.find((course) => course.id === courseId) || null
  return simulateBackend(course)
}

export async function getModulesByCourseId(courseId) {
  const courseModules = [...modules]
    .filter((module) => module.course_id === courseId)
    .sort((a, b) => a.module_order - b.module_order)

  return simulateBackend(courseModules)
}

export async function getModuleById(moduleId) {
  const module = modules.find((module) => module.id === moduleId) || null
  return simulateBackend(module)
}

export async function getContentByModuleId(moduleId) {
  const moduleContents = [...contents].filter((content) => content.module_id === moduleId)
  return simulateBackend(moduleContents)
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

export async function createModule(moduleData) {
  const { course_id, title, description, level } = moduleData

  const courseModules = modules.filter((m) => m.course_id === course_id)
  const nextOrder = courseModules.length > 0 ? Math.max(...courseModules.map((m) => m.module_order)) + 1 : 1

  const newId = Math.max(...modules.map((m) => m.id), 0) + 1

  const newModule = {
    id: newId,
    course_id,
    title,
    description,
    level,
    module_order: nextOrder,
  }

  modules = [...modules, newModule]

  const newContent = {
    id: Math.max(...contents.map((content) => content.id), 0) + 1,
    module_id: newId,
    content_type: "Video",
    title: `Video ${title}`,
    content: null,
    video_url: `/videos/${title.toLowerCase().replace(/\s+/g, "-")}.mp4`,
    file_path: null,
    created_at: new Date(),
  }

  contents = [...contents, newContent]

  return simulateBackend(newModule)
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

export async function getDefaultCourse() {
  return getCourseById(1)
}

export async function getDefaultCourseId() {
  return 1
}
