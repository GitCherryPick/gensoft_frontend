"use client";
import { Code, BookOpen, FileCode, Award } from "lucide-react";
const courses = [
  {
    id: 1,
    name: "Introducción a Python",
    completed: true,
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    topics: [
      "Variables y tipos de datos",
      "Operadores",
      "Estructuras de control",
      "Funciones básicas",
    ],
  },

  {
    id: 3,
    name: "Estructura de datos en Python",
    completed: false,
    progress: 60,
    totalLessons: 8,
    completedLessons: 5,
    topics: [
      "Funciones avanzadas",
      "Argumentos",
      "Módulos y paquetes",
      "Bibliotecas estándar",
    ],
  },
];

export default function coursesPage() {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border border-gray-700 bg-gray-800 rounded-lg p-5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  course.completed
                    ? "bg-green-900 text-green-400"
                    : "bg-indigo-900 text-indigo-400"
                }`}
              >
                {course.completed ? (
                  <Award size={24} />
                ) : (
                  <BookOpen size={24} />
                )}
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-200 text-lg">
                  {course.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {course.completedLessons} de {course.totalLessons} lecciones
                  completadas
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-sm">
                {course.completed ? "Ver detalles" : "Continuar curso"}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-400">
                Progreso
              </span>
              <span className="text-xs text-gray-400">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  course.completed ? "bg-green-500" : "bg-indigo-500"
                }`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-300 mb-2">
              Temas del curso:
            </p>
            <div className="flex flex-wrap gap-2">
              {course.topics.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
