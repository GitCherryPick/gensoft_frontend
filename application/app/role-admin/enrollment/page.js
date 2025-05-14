"use client"
import ComponentMemorySimulator from "./ComponentMemorySimulator"

console.log("EnrollmentPage rendered")

export default function EnrollmentPage() {
  return (
    <div className="container mx-auto py-6 px-4 min-h-screen overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-white">Gestión de Inscripciones</h1>
      <ComponentMemorySimulator />
    </div>
  )
}
