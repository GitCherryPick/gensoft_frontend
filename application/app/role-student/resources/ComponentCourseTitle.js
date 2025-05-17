"use client"
import FadeIn from "@/components/animations/FadeIn"

export default function ComponentCourseTitle({ course, modules, isLoading, error }) {
  return (
    <div className="p-4 w-full">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          {!isLoading && course && (
            <FadeIn duration={0.3}>
              <h1 className="text-xl font-semibold">{course.title}</h1>
              <p className="text-sm text-gray-500">Número de módulos: {modules ? modules.length : 0}</p>
            </FadeIn>
          )}
          {(isLoading || !course) && <div className="h-10"></div>}
        </>
      )}
    </div>
  )
}
