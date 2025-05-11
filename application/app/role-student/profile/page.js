"use client";
import PromiseButton from "@/components/core/PromiseButton";
import { Code, BookOpen, FileCode, Award, Brain } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfilePage() {
  // Datos del estudiante
  const student = {
    profile: "https://i.pravatar.cc/250?u=felipe.ramos@example.com",
    name: "Andrea Rodríguez",
    role: "Estudiante de Programación",
    bio: "Entusiasta de la tecnología aprendiendo los fundamentos de Python. Me interesa el desarrollo de software y la ciencia de datos.",
    courses: [
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
        name: "Funciones y Modularidad",
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
    ],
    projects: [
      {
        id: 1,
        name: "Calculadora Simple",
        description: "Calculadora con operaciones básicas",
      },
      {
        id: 2,
        name: "Juego de Adivinanza",
        description: "Juego para adivinar un número aleatorio",
      },
    ],
    certificates: [
      {
        id: 1,
        name: "Fundamentos de Python",
        issueDate: "15 Marzo 2025",
        issuer: "CodeAcademy",
        image: "/api/placeholder/200/150",
      },
      {
        id: 2,
        name: "Estructuras de Datos",
        issueDate: "20 Abril 2025",
        issuer: "Python Institute",
        image: "/api/placeholder/200/150",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-00">
      {/* Header con banner */}
      <div className="bg-slate-950 h-32 w-full"></div>

      {/* Contenido principal 0D0C11*/}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 w-full">
        <div className="bg-slate-950 rounded-lg shadow-xl overflow-hidden border border-gray-400">
          {/* Sección superior con foto e info básica */}
          <div className="md:flex p-6">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="relative flex flex-col items-center">
                <div className="h-50 w-50 rounded-full overflow-hidden border-2 border-gray-400 shadow-lg">
                  <img
                    src={student.profile}
                    alt="Foto de perfil"
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="mt-4">
                  <PromiseButton loadingText="Iniciando sesión...">
                    Editar perfil
                  </PromiseButton>
                </div>

                <div className="absolute bottom-0 right-0 bg-green-500 h-6 w-6 rounded-full border-4 border-gray-700"></div>
              </div>
            </div>

            <div className="md:w-3/4 mt-6 md:mt-0 md:pl-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-100">
                    {student.name}
                  </h1>
                  <p className="text-gray-400">{student.role}</p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-300">
                  Sobre mí
                </h2>
                <p className="mt-2 text-gray-400">{student.bio}</p>
              </div>
            </div>
          </div>

          {/* Implementación de Tabs de Radix UI */}
          <div className="border-t border-gray-700">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="flex overflow-x-auto w-full border-b border-gray-700 p-0 h-auto">
                <TabsTrigger
                  value="info"
                  className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <BookOpen size={18} className="mr-2" /> Información
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <FileCode size={18} className="mr-2" /> Cursos
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Code size={18} className="mr-2" /> Proyectos
                </TabsTrigger>
                <TabsTrigger
                  value="certificates"
                  className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Award size={18} className="mr-2" /> Certificados
                </TabsTrigger>
              </TabsList>

              {/* Contenido de los tabs */}
              <div className="p-6">
                <TabsContent value="info" className="m-0">
                  <div className="flex justify-center">
                    <div className="w-full max-w-3xl">
                      <h3 className="text-xl font-semibold text-gray-300 mb-6">
                        Habilidades
                      </h3>
                      <div className="space-y-6 bg-gray-800 rounded-xl p-6 shadow-md">
                        {/* Skill: Python */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-base font-medium text-gray-300 flex items-center gap-2">
                              <Code size={18} className="text-indigo-400" />
                              Python
                            </span>

                            <span className="text-indigo-300 font-semibold">
                              40%
                            </span>
                          </div>
                          <div className="relative w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-3 rounded-full transition-all duration-500"
                              style={{ width: "40%" }}
                            ></div>
                          </div>
                        </div>

                        {/* Skill: Algoritmos */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-base font-medium text-gray-300 flex items-center gap-2">
                              <Brain size={18} className="text-indigo-400" />
                              Algoritmos
                            </span>

                            <span className="text-indigo-300 font-semibold">
                              40%
                            </span>
                          </div>
                          <div className="relative w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-3 rounded-full transition-all duration-500"
                              style={{ width: "30%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="courses" className="m-0">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    Mis Cursos
                  </h3>
                  <div className="space-y-6">
                    {student.courses.map((course) => (
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
                                {course.completedLessons} de{" "}
                                {course.totalLessons} lecciones completadas
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-sm">
                              {course.completed
                                ? "Ver detalles"
                                : "Continuar curso"}
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-400">
                              Progreso
                            </span>
                            <span className="text-xs text-gray-400">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                course.completed
                                  ? "bg-green-500"
                                  : "bg-indigo-500"
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
                </TabsContent>

                <TabsContent value="projects" className="m-0">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    Mis Proyectos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.projects.map((project) => (
                      <div
                        key={project.id}
                        className="border border-gray-700 bg-gray-800 rounded-lg p-4"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-900 text-purple-400 flex items-center justify-center">
                            <Code size={20} />
                          </div>
                          <h4 className="ml-3 font-medium text-gray-200">
                            {project.name}
                          </h4>
                        </div>
                        <p className="mt-3 text-sm text-gray-400">
                          {project.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                            Ver código
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="certificates" className="m-0">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">
                    Mis Certificados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {student.certificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="border border-gray-700 bg-gray-800 rounded-lg p-4"
                      >
                        <div className="flex flex-col">
                          <div className="w-full h-40 bg-gray-700 rounded-lg overflow-hidden mb-4">
                            <img
                              src={certificate.image}
                              alt={certificate.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-lg font-medium text-gray-200">
                            {certificate.name}
                          </h4>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                              Emisor: {certificate.issuer}
                            </span>
                            <span className="text-sm text-gray-400">
                              Fecha: {certificate.issueDate}
                            </span>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Descargar
                            </button>
                            <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                              </svg>
                              Compartir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
