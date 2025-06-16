"use client"

import { useState, useEffect } from "react"
import { Camera } from 'lucide-react'
import { getCurrentUser } from "@/lib/auth/auth-service"
import { getUserById } from "@/lib/users/users-service"

export default function ProfileHeader() {
  const [isOnline, setIsOnline] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser()
        const data = await getUserById(user.id)
        setTeacher({
          name: data.full_name || "Usuario",
          email: data.email || "correo@ejemplo.com",
          title: data.status || "Docente",
        })
      } catch (error) {
        console.error("Error al obtener datos del docente:", error)
      }
    }

    fetchUser()
  }, [])

  if (!teacher) {
    return <div className="text-center p-4 text-gray-300">Cargando perfil...</div>
  }

  const initialLetter = teacher.name?.charAt(0).toUpperCase()

  return (
    <div className="bg-[#0e101e] rounded-lg p-4 mb-4 shadow-md relative border border-gray-800">
      <div className="flex flex-col md:flex-row items-center gap-4">

        {/* Círculo con letra */}
        <div
          className="relative group w-[120px] h-[120px] rounded-full border-2 border-gray-700 shadow-sm bg-green-600 flex items-center justify-center cursor-default select-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="text-white text-4xl font-bold">
            {initialLetter}
          </span>

          {/* Overlay con ícono al pasar el mouse */}
          <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center text-white">
              <Camera size={20} className="mx-auto mb-1" />
              <span className="text-xs font-semibold">Sin foto</span>
            </div>
          </div>

          {/* Indicador online */}
          {isOnline && (
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border border-gray-800 animate-pulse-slow"></div>
          )}
        </div>

        {/* Información del docente */}
        <div className="flex-1 text-left space-y-1">
          <h1 className="text-2xl font-bold text-white">{teacher.name}</h1>
          <p className="text-sm text-gray-300 font-medium">{teacher.title}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs">{teacher.email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
