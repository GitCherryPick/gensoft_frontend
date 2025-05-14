"use client"

export default function ProjectsContent() {
  // Datos de ejemplo para proyectos del docente
  const projects = [
    {
      id: 1,
      title: "Desarrollo de Modelos Estadísticos para Predicción Climática",
      description:
        "Investigación aplicada para desarrollar modelos estadísticos que permitan predecir patrones climáticos en regiones altiplánicas de Bolivia.",
      status: "En progreso",
      collaborators: ["Universidad Mayor de San Andrés", "Instituto de Hidrología Boliviano"],
      year: "2024-2025",
    },
    {
      id: 2,
      title: "Matemáticas para Educación Rural",
      description:
        "Proyecto educativo para desarrollar materiales didácticos adaptados a contextos rurales bolivianos, con enfoque en matemáticas aplicadas a la agricultura.",
      status: "Completado",
      collaborators: ["Ministerio de Educación", "Comunidades Rurales de Cochabamba"],
      year: "2022-2023",
    },
    {
      id: 3,
      title: "Análisis Estadístico de Factores Socioeconómicos en Educación Superior",
      description:
        "Estudio sobre el impacto de factores socioeconómicos en el rendimiento académico de estudiantes universitarios en Bolivia.",
      status: "Publicado",
      collaborators: ["Universidad Católica Boliviana", "Fundación para la Educación Superior"],
      year: "2021",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Mis Proyectos</h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#0e101e] rounded-lg p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-medium">{project.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  project.status === "En progreso"
                    ? "bg-blue-900 text-blue-300"
                    : project.status === "Completado"
                      ? "bg-green-900 text-green-300"
                      : "bg-purple-900 text-purple-300"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{project.description}</p>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
              <div>
                <span className="text-gray-400">Colaboradores: </span>
                <span className="text-white">{project.collaborators.join(", ")}</span>
              </div>
              <div>
                <span className="text-gray-400">Año: </span>
                <span className="text-white">{project.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}