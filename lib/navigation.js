/**
 * Navigation utility functions for consistent routing throughout the application
 */

// Role-based route mapping
export const ROUTES = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",

  // Student routes
  STUDENT: {
    ROOT: "/role-student",
    PROBLEMS: "/role-student/problems",
    PROFILE: "/role-student/profile",
    SETTINGS: "/role-student/settings",
  },

  // Admin routes
  ADMIN: {
    ROOT: "/role-admin",
    USERS: "/role-admin/users",
    ENROLLMENT: "/role-admin/enrollment",
  },

  // Teacher routes
  TEACHER: {
    ROOT: "/role-teacher",
    TASKS: "/role-teacher/tasks",
    EXAMS: "/role-teacher/exams",
    STUDENTS: "/role-teacher/students",
  },
}

// Role-based default routes (where to redirect when accessing the root of a role)
export const DEFAULT_ROUTES = {
  STUDENT: ROUTES.STUDENT.PROBLEMS,
  ADMIN: ROUTES.ADMIN.USERS,
  TEACHER: ROUTES.TEACHER.TASKS,
}

// Helper function to get navigation links by role
export function getNavLinks(role) {
  switch (role) {
    case "student":
      return [
        {
          label: "Problemas",
          href: ROUTES.STUDENT.PROBLEMS,
          icon: "IconBrain", // These would be imported and used in the component
        },
        {
          label: "Perfil",
          href: ROUTES.STUDENT.PROFILE,
          icon: "IconUser",
        },
        {
          label: "Configuraciones",
          href: ROUTES.STUDENT.SETTINGS,
          icon: "IconSettings",
        },
        {
          label: "Cerrar Sesión",
          href: ROUTES.HOME,
          icon: "IconArrowLeft",
        },
      ]
    case "admin":
      return [
        {
          label: "Gestión de Usuarios",
          href: ROUTES.ADMIN.USERS,
          icon: "IconUsers",
        },
        {
          label: "Matriculación",
          href: ROUTES.ADMIN.ENROLLMENT,
          icon: "IconSchool",
        },
        {
          label: "Cerrar Sesión",
          href: ROUTES.HOME,
          icon: "IconArrowLeft",
        },
      ]
    case "teacher":
      return [
        {
          label: "Crear Tareas",
          href: ROUTES.TEACHER.TASKS,
          icon: "IconClipboardList",
        },
        {
          label: "Exámenes",
          href: ROUTES.TEACHER.EXAMS,
          icon: "IconFileText",
        },
        {
          label: "Alumnos",
          href: ROUTES.TEACHER.STUDENTS,
          icon: "IconUsers",
        },
        {
          label: "Cerrar Sesión",
          href: ROUTES.HOME,
          icon: "IconArrowLeft",
        },
      ]
    default:
      return []
  }
}
