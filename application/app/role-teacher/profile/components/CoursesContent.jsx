"use client"

import Image from "next/image"

export default function CoursesContent() {
  // Datos de ejemplo para cursos impartidos por el docente
  const courses = [
    {
      id: 1,
      title: "Matemáticas para Ciencia de Datos",
      description: "Fundamentos matemáticos esenciales para análisis de datos y machine learning",
      students: 45,
      level: "Intermedio",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Estadística Aplicada",
      description: "Métodos estadísticos para investigación y análisis de datos experimentales",
      students: 38,
      level: "Avanzado",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Álgebra Lineal",
      description: "Conceptos fundamentales de álgebra lineal y sus aplicaciones prácticas",
      students: 52,
      level: "Básico",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Mis Cursos</h2>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#0e101e] rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-[200px] h-[120px] relative">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-white font-medium mb-2">{course.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Estudiantes: </span>
                  <span className="text-white">{course.students}</span>
                </div>
                <div>
                  <span className="text-gray-400">Nivel: </span>
                  <span className="text-white">{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}