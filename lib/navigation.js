"use client"

/**
 * Navigation utility functions for consistent routing throughout the application
 */
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",

  STUDENT: {
    ROOT: "/role-student",
    PROBLEMS: "/role-student/problems",
    PROFILE: "/role-student/profile",
    SETTINGS: "/role-student/settings",
  },

  ADMIN: {
    ROOT: "/role-admin",
    USERS: "/role-admin/users",
    ENROLLMENT: "/role-admin/enrollment",
  },

  TEACHER: {
    ROOT: "/role-teacher",
    TASKS: "/role-teacher/tasks",
    EXAMS: "/role-teacher/exams",
    STUDENTS: "/role-teacher/students",
    CONTENT: "/role-teacher/content",
  },
}

export const DEFAULT_ROUTES = {
  STUDENT: ROUTES.STUDENT.PROBLEMS,
  ADMIN: ROUTES.ADMIN.USERS,
  TEACHER: ROUTES.TEACHER.TASKS,
}

export function getNavLinks(role) {
  switch (role) {
    case "student":
      return [
        {
          label: "Problemas",
          href: ROUTES.STUDENT.PROBLEMS,
          icon: "IconBrain",
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
          label: "Gestión de Contenido",
          href: ROUTES.TEACHER.CONTENT,
          icon: "IconBook",
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

export function usePrefetchRoutes(role = "all") {
  const router = useRouter()

  useEffect(() => {
    if (role === "student" || role === "all") {
      router.prefetch(ROUTES.STUDENT.ROOT)
      router.prefetch(ROUTES.STUDENT.PROBLEMS)
      router.prefetch(ROUTES.STUDENT.PROFILE)
      router.prefetch(ROUTES.STUDENT.SETTINGS)
    }

    if (role === "admin" || role === "all") {
      router.prefetch(ROUTES.ADMIN.ROOT)
      router.prefetch(ROUTES.ADMIN.USERS)
      router.prefetch(ROUTES.ADMIN.ENROLLMENT)
    }

    if (role === "teacher" || role === "all") {
      router.prefetch(ROUTES.TEACHER.ROOT)
      router.prefetch(ROUTES.TEACHER.TASKS)
      router.prefetch(ROUTES.TEACHER.EXAMS)
      router.prefetch(ROUTES.TEACHER.STUDENTS)
      router.prefetch(ROUTES.TEACHER.CONTENT)
    }
  }, [router, role])
}
