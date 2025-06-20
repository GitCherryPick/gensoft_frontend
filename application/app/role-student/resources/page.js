"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCourseData } from "./useCourseData"
import { useState } from "react"
import ComponentCourseTitle from "./ComponentCourseTitle"
import ComponentModuleList from "./ComponentModuleList"
import ComponentModuleHeader from "./ComponentModuleHeader"
import ComponentModuleContent from "./ComponentModuleContent"
import ComponentMemorySimulator from "./ComponentMemorySimulator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ResourcesPage() {
  const { course, modules, isLoading, error } = useCourseData()
  const [selectedModule, setSelectedModule] = useState(null)
  const isSimulatorActive = selectedModule?.id === 'sim-memory'
  
  const handleGoBack = () => {
    setSelectedModule(null)
  }

  if (isSimulatorActive) {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="w-full flex-shrink-0 h-16 flex items-center p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack} 
            className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </Button>
        </div>
        <div className="flex-1 p-4">
          <ComponentMemorySimulator initialIndex={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="w-full border-b border-gray-200 dark:border-gray-700 flex-shrink-0 h-20 flex items-center">
        <ComponentCourseTitle course={course} modules={modules} isLoading={isLoading} error={error} />
      </div>

      <div className="flex flex-1 w-full min-h-0">
        <div className="w-1/4 border-r border-gray-200 dark:border-gray-700">
          <ComponentModuleList
            modules={modules}
            isLoading={isLoading}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />
        </div>

        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ComponentModuleHeader selectedModule={selectedModule} />
              <ComponentModuleContent moduleId={selectedModule?.id} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
