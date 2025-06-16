"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import FadeIn from "@/components/animations/FadeIn"
import { useEffect } from "react"

export default function ComponentModuleList({ modules, isLoading, selectedModule, setSelectedModule }) {
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

  useEffect(() => {
    if (modules && modules.length > 0 && !selectedModule) {
      setSelectedModule(modules[0])
    }
  }, [modules, selectedModule, setSelectedModule])

  return (
    <ScrollArea className="h-full">
      <div className="py-4">
        {!isLoading && modules && modules.length > 0 ? (
          <div className="space-y-1">
            {modules.map((module, index) => (
              <FadeIn key={module.id} delay={0.1 + index * 0.05} duration={0.3}>
                <div
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 border-l-2 
                      ${
                        selectedModule && selectedModule.id === module.id
                          ? "border-cta-1 bg-gray-50 dark:bg-gray-800/20"
                          : "border-transparent"
                      } cursor-pointer transition-colors`}
                  onClick={() => setSelectedModule(module)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {module.module_order}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">{module.title}</h3>
                      {module.level && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{getLevelText(module.level)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
            
            <FadeIn delay={0.1 + (modules?.length || 0) * 0.05} duration={0.3}>
              <div
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 border-l-2 
                  ${selectedModule && selectedModule.id === 'sim-memory' ? "border-cta-1 bg-gray-50 dark:bg-gray-800/20" : "border-transparent"}
                  cursor-pointer transition-colors`}
                onClick={() => setSelectedModule({ id: 'sim-memory', title: 'Simulador de memoria', type: 'tool' })}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">Simulador de memoria</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Herramienta</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        ) : !isLoading ? (
          <div className="flex items-center justify-center h-32 text-sm text-gray-500">No hay módulos disponibles</div>
        ) : null}
      </div>
    </ScrollArea>
  )
}
