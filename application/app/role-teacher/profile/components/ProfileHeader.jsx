"use client"

import { useState, useRef } from "react"
import { Camera, Upload } from 'lucide-react'

export default function ProfileHeader() {
  const [isOnline, setIsOnline] = useState(true)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=200&width=200")
  const [isHovering, setIsHovering] = useState(false)
  const fileInputRef = useRef(null)

  // Datos simplificados del docente
  const teacher = {
    name: "María García",
    email: "maria.garcia@universidad.edu",
    title: "Docente de Phython"
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-[#0e101e] rounded-lg p-4 mb-4 shadow-md relative border border-gray-800">
      <div className="flex flex-col md:flex-row items-center gap-4">

        <div className="relative group">
          <div 
            className="w-[120px] h-[120px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={triggerFileInput}
          >
            <img
              src={profileImage}
              alt={teacher.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center text-white">
                <Camera size={20} className="mx-auto mb-1" />
                <span className="text-xs font-semibold">Cambiar foto</span>
              </div>
            </div>
          </div>


          {isOnline && (
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-gray-800 animate-pulse-slow"></div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>


        <div className="flex-1 text-left space-y-1">
          <h1 className="text-2xl font-bold text-white">{teacher.name}</h1>
          <p className="text-sm text-gray-300 font-medium">{teacher.title}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs">{teacher.email}</span>
          </div>
          
          <button
            onClick={triggerFileInput}
            className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1 md:hidden"
          >
            <Upload size={14} />
            Cambiar foto
          </button>
        </div>
      </div>

      {profileImage !== "/placeholder.svg?height=200&width=200" && (
        <div className="absolute top-2 right-2">
          <div className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm animate-fade-in">
            Foto actualizada
          </div>
        </div>
      )}
    </div>
  )
}