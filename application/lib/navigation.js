"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",

  RECOVER_PASSWORD: {
    ROOT: "/recover-password",
    RECOVERY_CARD: "/recover-password/recovery-password-card",
    PASSWORD_RESET_CARD: "/recover-password/password-reset-card",
    NOTIFY_RECOVER: "/recover-password/notify-recover",
  },

  STUDENT: {
    ROOT: "/role-student",
    COURSES: "/role-student/courses",
    PROFILE: "/role-student/profile",
  },

  ADMIN: {
    ROOT: "/role-admin",
    USERS: "/role-admin/users",
    ENROLLMENT: "/role-admin/enrollment",
  },

  TEACHER: {
    ROOT: "/role-teacher",
    STUDENTS: "/role-teacher/students",
    CONTENT: "/role-teacher/content",
    PROFILE: "/role-teacher/profile",
    COURSES: "/role-teacher/courses",
    COURSE_DETAILS: (id) => `/role-teacher/courses/${id}`,
    RESOURCES: "/role-teacher/resources",
  },
};

export const DEFAULT_ROUTES = {
  STUDENT: ROUTES.STUDENT.COURSES,
  ADMIN: ROUTES.ADMIN.USERS,
  TEACHER: ROUTES.TEACHER.STUDENTS,
}

export function getNavLinks(role) {
  switch (role) {
    case "student":
      return [
        {
          label: "Cursos",
          href: ROUTES.STUDENT.COURSES,
          icon: "IconBrain",
        },
        {
          label: "Perfil",
          href: ROUTES.STUDENT.PROFILE,
          icon: "IconUser",
        },
        {
          label: "Cerrar Sesión",
          href: ROUTES.HOME,
          icon: "IconArrowLeft",
        },
      ];
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
      ];
    case "teacher":
      return [
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
      ];
    default:
      return [];
  }
}

export function usePrefetchRoutes(role = "all") {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.HOME);

    if (role === "student" || role === "all") {
      router.prefetch(ROUTES.STUDENT.ROOT);
      router.prefetch(ROUTES.STUDENT.COURSES);
      router.prefetch(ROUTES.STUDENT.PROFILE);
    }

    if (role === "admin" || role === "all") {
      router.prefetch(ROUTES.ADMIN.ROOT);
      router.prefetch(ROUTES.ADMIN.USERS);
      router.prefetch(ROUTES.ADMIN.ENROLLMENT);
    }

    if (role === "teacher" || role === "all") {
      router.prefetch(ROUTES.TEACHER.ROOT)
      router.prefetch(ROUTES.TEACHER.STUDENTS)
      router.prefetch(ROUTES.TEACHER.CONTENT)
    }
  }, [router, role]);
}
