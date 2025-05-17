"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCourseData } from "./useCourseData"
import { useState } from "react"
import ComponentCourseTitle from "./ComponentCourseTitle"
import ComponentModuleList from "./ComponentModuleList"

export default function ResourcesPage() {
  const { course, modules, isLoading, error } = useCourseData()
  const [selectedModule, setSelectedModule] = useState(null)

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  const repeatedText = Array(20).fill(loremIpsum).join(" ")

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
              {selectedModule && (
                <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-mono text-gray-500">ID del módulo: {selectedModule.id}</span>
                </div>
              )}

              <h2 className="text-lg font-medium mb-2">Sección Derecha</h2>
              <p className="text-sm">{repeatedText}</p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
