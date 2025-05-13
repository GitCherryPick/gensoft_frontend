"use client"
import Image from "next/image"
import Link from "next/link"
import { Download, Share2, FileText, Video, ImageIcon, FileCode } from 'lucide-react'

export default function TeacherResources() {
  // Datos de ejemplo para los recursos
  const resources = [
    {
      id: "1",
      title: "Introducción a Variables y Tipos de Datos",
      type: "document",
      format: "pdf",
      category: "Fundamentos",
      isOER: true,
      downloads: 128,
      lastUpdated: "2025-05-10T14:30:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "2",
      title: "Tutorial: Estructuras de Control en Python",
      type: "video",
      format: "mp4",
      category: "Tutoriales",
      isOER: true,
      downloads: 95,
      lastUpdated: "2025-05-08T10:15:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <Video className="h-10 w-10 text-red-500" />,
    },
    {
      id: "3",
      title: "Infografía: Ciclo de Vida de un Programa",
      type: "image",
      format: "png",
      category: "Infografías",
      isOER: false,
      downloads: 76,
      lastUpdated: "2025-05-11T09:45:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <ImageIcon className="h-10 w-10 text-green-500" />,
    },
    {
      id: "4",
      title: "Ejemplos de Funciones Recursivas",
      type: "code",
      format: "py",
      category: "Ejemplos de Código",
      isOER: true,
      downloads: 112,
      lastUpdated: "2025-05-09T16:20:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <FileCode className="h-10 w-10 text-purple-500" />,
    },
    {
      id: "5",
      title: "Guía de Buenas Prácticas en Python",
      type: "document",
      format: "pdf",
      category: "Guías",
      isOER: true,
      downloads: 89,
      lastUpdated: "2025-05-07T11:45:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <FileText className="h-10 w-10 text-blue-500" />,
    },
    {
      id: "6",
      title: "Simulación: Algoritmos de Ordenamiento",
      type: "interactive",
      format: "html",
      category: "Simulaciones",
      isOER: false,
      downloads: 64,
      lastUpdated: "2025-05-06T13:10:00Z",
      thumbnail: "/placeholder.svg?height=100&width=200",
      icon: <FileCode className="h-10 w-10 text-amber-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Mis Recursos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-[#13141f] rounded-xl overflow-hidden">
              <div className="h-48 bg-[#1c1e2d] flex justify-center items-center">
                {resource.type === "video" || resource.type === "image" ? (
                  <Image
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    width={200}
                    height={100}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    {resource.icon}
                    <span className="mt-2 text-sm font-medium uppercase">{resource.format}</span>
                  </div>
                )}
                {resource.isOER && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    OER
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-400 mb-4">
                  {resource.category} •{" "}
                  {new Date(resource.lastUpdated).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Download size={16} />
                    <span>{resource.downloads} descargas</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Share2 size={18} />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}