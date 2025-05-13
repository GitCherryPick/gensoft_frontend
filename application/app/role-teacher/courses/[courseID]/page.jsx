"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react'
import { ROUTES } from "@/lib/navigation"

export default function CourseDetails({ params }) {
  // Datos de ejemplo para el curso
  const course = {
    id: params.courseId,
    title: "Introducción a Python",
    description:
      "Un curso completo para principiantes que cubre los fundamentos de la programación en Python, desde variables y tipos de datos hasta estructuras de control y funciones básicas.",
    image: "/placeholder.svg?height=200&width=800",
    students: 45,
    modules: 8,
    activities: 24,
    progress: 68,
    lastUpdated: "10 de mayo, 2025",
    status: "active",
    startDate: "15 de febrero, 2025",
    endDate: "30 de junio, 2025",
  }

  // Datos de ejemplo para los estudiantes
  const students = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      progress: 75,
      lastActivity: "Hace 2 horas",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
    },
    {
      id: "2",
      name: "María González",
      email: "maria.gonzalez@ejemplo.com",
      progress: 92,
      lastActivity: "Hace 1 día",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MG",
    },
    {
      id: "3",
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@ejemplo.com",
      progress: 45,
      lastActivity: "Hace 3 días",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CR",
    },
  ]

  // Datos de ejemplo para los módulos
  const modules = [
    {
      id: "1",
      title: "Introducción a la programación",
      lessons: 3,
      completed: true,
    },
    {
      id: "2",
      title: "Variables y tipos de datos",
      lessons: 4,
      completed: true,
    },
    {
      id: "3",
      title: "Estructuras de control",
      lessons: 5,
      completed: true,
    },
    {
      id: "4",
      title: "Funciones y módulos",
      lessons: 4,
      completed: false,
    },
  ]

  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Encabezado del curso */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-gray-400">
            <Link href="/role-teacher/courses" className="hover:text-white">
              Cursos
            </Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
        </div>

        {/* Imagen del curso */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          <div className="absolute bottom-4 right-4">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">Activo</span>
          </div>
        </div>

        {/* Estadísticas del curso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#13141f] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-[#6d5acd]" />
              <h3 className="text-lg font-semibold">Estudiantes</h3>
            </div>
            <p className="text-3xl font-bold">{course.students}</p>
          </div>

          <div className="bg-[#13141f] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-[#6d5acd]" />
              <h3 className="text-lg font-semibold">Progreso General</h3>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-3xl font-bold">{course.progress}%</p>
              <span className="text-gray-400">{course.modules} módulos</span>
            </div>
            <div className="w-full h-2 bg-[#1c1e2d] rounded-full overflow-hidden">
              <div className="h-full bg-[#6d5acd]" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>

          <div className="bg-[#13141f] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-[#6d5acd]" />
              <h3 className="text-lg font-semibold">Fechas del Curso</h3>
            </div>
            <div className="text-gray-300">
              <p>Inicio: {course.startDate}</p>
              <p>Fin: {course.endDate}</p>
            </div>
          </div>
        </div>

        {/* Descripción del curso */}
        <div className="bg-[#13141f] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Descripción del Curso</h2>
          <p className="text-gray-300">{course.description}</p>
        </div>

        {/* Navegación */}
        <div className="bg-[#13141f] rounded-xl mb-8">
          <div className="flex flex-wrap">
            <Link href="#resumen" className="flex items-center gap-2 px-6 py-4 text-white border-b-2 border-[#6d5acd]">
              Resumen
            </Link>
            <Link href="#estudiantes" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              Estudiantes
            </Link>
            <Link href="#contenido" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              Contenido
            </Link>
            <Link href="#actividades" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              Actividades
            </Link>
            <Link href="#analiticas" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              Analíticas
            </Link>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Estudiantes recientes */}
          <div className="bg-[#13141f] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Estudiantes Recientes</h2>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1c1e2d] flex items-center justify-center text-sm font-medium">
                    <Image
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-gray-400">{student.email}</p>
                  </div>
                  <div>
                    <div className="text-right mb-1">
                      <span className="text-sm">{student.progress}%</span>
                    </div>
                    <div className="w-20 h-1.5 bg-[#1c1e2d] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6d5acd]" style={{ width: `${student.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[#6d5acd] border border-[#6d5acd] rounded-md hover:bg-[#6d5acd] hover:text-white transition">
              Ver todos los estudiantes
            </button>
          </div>

          {/* Módulos */}
          <div className="bg-[#13141f] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Módulos del Curso</h2>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {module.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="font-medium">
                        Módulo {index + 1}: {module.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{module.lessons} lecciones</span>
                  </div>
                  <div className="w-full h-2 bg-[#1c1e2d] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6d5acd]" style={{ width: module.completed ? "100%" : "50%" }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[#6d5acd] border border-[#6d5acd] rounded-md hover:bg-[#6d5acd] hover:text-white transition">
              Ver todos los módulos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}