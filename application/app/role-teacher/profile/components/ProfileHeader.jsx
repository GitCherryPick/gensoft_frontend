"use client"

import { useState } from "react"
import Image from "next/image"

export default function ProfileHeader() {
  const [isOnline, setIsOnline] = useState(true)

  // Datos de ejemplo del docente
  const teacher = {
    name: "Carlos Mendoza",
    role: "Docente de Matemáticas",
    about:
      "Profesor con 10 años de experiencia en educación superior. Especializado en matemáticas aplicadas y estadística para ciencias de datos.",
    avatar: "/placeholder.svg?height=200&width=200",
  }

  return (
    <div className="bg-[#0e101e] rounded-lg p-8 mb-4 relative">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
            <Image
              src={teacher.avatar || "/placeholder.svg"}
              alt={teacher.name}
              width={180}
              height={180}
              className="object-cover"
            />
          </div>
          <button className="bg-[#7c5cfc] text-white py-2 px-4 rounded-md mt-4 w-full font-medium">
            Editar perfil
          </button>
          {isOnline && (
            <div className="absolute bottom-16 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0e101e]"></div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-white mb-1">{teacher.name}</h1>
          <p className="text-gray-400 mb-6">{teacher.role}</p>

          <div className="space-y-2">
            <h2 className="text-white font-medium">Sobre mí</h2>
            <p className="text-gray-300 leading-relaxed">{teacher.about}</p>
          </div>
        </div>
      </div>
    </div>
  )
}