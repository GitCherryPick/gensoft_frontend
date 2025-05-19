"use client"

export default function ComponentModuleHeader({ selectedModule }) {
  const getLevelText = (level) => {
    if (!level) return ""

    const levelLower = level.toLowerCase()

    if (levelLower === "básico" || levelLower === "basico" || levelLower === "1") {
      return "Básico"
    } else if (levelLower === "intermedio" || levelLower === "2") {
      return "Intermedio"
    } else if (levelLower === "avanzado" || levelLower === "3") {
      return "Avanzado"
    } else {
      return level
    }
  }

  if (!selectedModule) return null

  return (
    <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{selectedModule.title}</h2>
          {selectedModule.level && (
            <span className="px-3 py-1 text-xs font-medium bg-cta-1/10 text-cta-1 rounded-md">
              Nivel: {getLevelText(selectedModule.level)}
            </span>
          )}
        </div>

        {selectedModule.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedModule.description}</p>
        )}
      </div>
    </div>
  )
}
