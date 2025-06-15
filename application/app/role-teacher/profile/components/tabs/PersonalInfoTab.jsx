"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Globe, Linkedin, Twitter, Edit3, Save, X } from 'lucide-react'

export default function PersonalInfoTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo del docente
  const teacherInfo = {
    name: "María García",
    email: "maria.garcia@universidad.edu",
    phone: "+34 612 345 678",
    address: "Calle Principal 123, Madrid",
    birthdate: "15/05/1980",
    bio: "Docente con más de 15 años de experiencia en educación superior. Especializada en metodologías de enseñanza innovadoras y tecnología educativa. Mi pasión por la educación me ha llevado a desarrollar múltiples proyectos de investigación en el ámbito de la pedagogía digital.",
    website: "www.mariagarcia-educacion.com",
    socialMedia: {
      linkedin: "linkedin.com/in/mariagarcia",
      twitter: "twitter.com/mariagarcia_edu",
    },
  }

  return (
    <div className="w-full">
      
      <div className="sticky top-0 py-4 px-6 -mx-6 mb-6 z-10 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-white">Información Personal</h2>
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save size={16} />
                <span>Guardar cambios</span>
              </>
            ) : (
              <>
                <Edit3 size={16} />
                <span>Editar información</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Contenido principal con mejor espaciado */}
      <div className="space-y-8 pb-12">
        {/* Card de información básica */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
          <h3 className="flex items-center text-lg font-semibold text-white mb-6">
            <div className="p-1.5 bg-blue-500/20 rounded-md mr-3">
              <User className="w-4 h-4 text-blue-400" />
            </div>
            Información básica
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField 
              icon={<User size={16} />}
              label="Nombre completo" 
              value={teacherInfo.name} 
              isEditing={isEditing} 
            />
            <InfoField 
              icon={<Mail size={16} />}
              label="Correo electrónico" 
              value={teacherInfo.email} 
              isEditing={isEditing} 
            />
            <InfoField 
              icon={<Phone size={16} />}
              label="Teléfono" 
              value={teacherInfo.phone} 
              isEditing={isEditing} 
            />
            <InfoField 
              icon={<Calendar size={16} />}
              label="Fecha de nacimiento" 
              value={teacherInfo.birthdate} 
              isEditing={isEditing} 
            />
            <InfoField 
              icon={<MapPin size={16} />}
              label="Dirección" 
              value={teacherInfo.address} 
              isEditing={isEditing} 
              className="md:col-span-2" 
            />
          </div>
        </div>

        {/* Card de enlaces y redes sociales */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
          <h3 className="flex items-center text-lg font-semibold text-white mb-6">
            <div className="p-1.5 bg-green-500/20 rounded-md mr-3">
              <Globe className="w-4 h-4 text-green-400" />
            </div>
            Enlaces y redes sociales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField 
              icon={<Globe size={16} />}
              label="Sitio web" 
              value={teacherInfo.website} 
              isEditing={isEditing}
              isLink={true}
            />
            <InfoField 
              icon={<Linkedin size={16} />}
              label="LinkedIn" 
              value={teacherInfo.socialMedia.linkedin} 
              isEditing={isEditing}
              isLink={true}
            />
            <InfoField 
              icon={<Twitter size={16} />}
              label="Twitter" 
              value={teacherInfo.socialMedia.twitter} 
              isEditing={isEditing}
              className="md:col-span-2"
              isLink={true}
            />
          </div>
        </div>

        {/* Espaciado final para scroll completo */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

function InfoField({ icon, label, value, isEditing, className = "", isLink = false }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center text-sm font-medium text-slate-300">
        <span className="text-slate-400 mr-2">{icon}</span>
        {label}
      </label>
      
      {isEditing ? (
        <input
          type="text"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          defaultValue={value}
          placeholder={`Ingresa tu ${label.toLowerCase()}`}
        />
      ) : (
        <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
          {isLink && value ? (
            <a 
              href={value.startsWith('http') ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center"
            >
              {value}
              <Globe size={14} className="ml-2 opacity-70" />
            </a>
          ) : (
            <p className="text-white">{value}</p>
          )}
        </div>
      )}
    </div>
  )
}