"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Users } from 'lucide-react'
import { ROUTES } from "@/lib/navigation"

export default function TeacherCourses() {
  // Datos de ejemplo para los cursos
  const courses = [
    {
      id: "1",
      title: "Introducción a Python",
      students: 45,
      duration: "8 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 68,
    },
    {
      id: "2",
      title: "Estructuras de Datos en Python",
      students: 32,
      duration: "10 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 42,
    },
    {
      id: "3",
      title: "Programación Orientada a Objetos",
      students: 28,
      duration: "6 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 25,
    },
    {
      id: "4",
      title: "Algoritmos y Complejidad",
      students: 22,
      duration: "12 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 15,
    },
    {
      id: "5",
      title: "Python para Ciencia de Datos",
      students: 38,
      duration: "8 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 52,
    },
    {
      id: "6",
      title: "Desarrollo Web con Python",
      students: 19,
      duration: "10 semanas",
      image: "/placeholder.svg?height=150&width=300",
      progress: 30,
    },
  ]

  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Mis Cursos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            // Si ROUTES.TEACHER.COURSE_DETAILS no está definido, usa la ruta directa
            <Link href={`/role-teacher/courses/${course.id}`} key={course.id}>
              <div className="bg-[#13141f] rounded-xl overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <div className="relative h-40">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{course.title}</h3>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={16} />
                      <span>{course.students} estudiantes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progreso del curso</span>
                      <span className="text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1c1e2d] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6d5acd]" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}