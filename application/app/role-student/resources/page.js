"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCourseData } from "./useCourseData"
import { useState } from "react"
import ComponentCourseTitle from "./ComponentCourseTitle"
import ComponentModuleList from "./ComponentModuleList"
import ComponentModuleHeader from "./ComponentModuleHeader"
import ComponentModuleContent from "./ComponentModuleContent"

export default function ResourcesPage() {
  const { course, modules, isLoading, error } = useCourseData()
  const [selectedModule, setSelectedModule] = useState(null)

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
              {selectedModule?.id === 'sim-memory' ? (
                <div style={{ textAlign: 'center', margin: '2rem', fontWeight: 'bold' }}>simulador</div>
              ) : (
                <ComponentModuleContent moduleId={selectedModule?.id} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
