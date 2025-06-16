"use client"

import { useState } from "react"

export default function PersonalInfoTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo del docente
  const teacherInfo = {
    name: "María García",
    email: "maria.garcia@universidad.edu",
    phone: "+34 612 345 678",
    address: "Calle Principal 123, Madrid",
    birthdate: "15/05/1980",
    bio: "Docente con más de 15 años de experiencia en educación superior. Especializada en metodologías de enseñanza innovadoras y tecnología educativa.",
    website: "www.mariagarcia-educacion.com",
    socialMedia: {
      linkedin: "linkedin.com/in/mariagarcia",
      twitter: "twitter.com/mariagarcia_edu",
    },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-1">Información Personal</h2>
        <button
          className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Guardar cambios" : "Editar información"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Información básica */}
        <div>
          <h3 className="text-md font-medium text-light-2 mb-3">Información básica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Nombre completo" value={teacherInfo.name} isEditing={isEditing} />
            <InfoField label="Correo electrónico" value={teacherInfo.email} isEditing={isEditing} />
            <InfoField label="Teléfono" value={teacherInfo.phone} isEditing={isEditing} />
            <InfoField label="Fecha de nacimiento" value={teacherInfo.birthdate} isEditing={isEditing} />
            <InfoField label="Dirección" value={teacherInfo.address} isEditing={isEditing} className="md:col-span-2" />
          </div>
        </div>

        {/* Biografía */}
        <div>
          <h3 className="text-md font-medium text-light-2 mb-3">Biografía</h3>
          {isEditing ? (
            <textarea
              className="w-full p-3 bg-dark-1 border border-dark-3 rounded-md text-light-1 focus:outline-none focus:ring-1 focus:ring-cta-1"
              rows={4}
              defaultValue={teacherInfo.bio}
            />
          ) : (
            <p className="text-light-2">{teacherInfo.bio}</p>
          )}
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="text-md font-medium text-light-2 mb-3">Enlaces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Sitio web" value={teacherInfo.website} isEditing={isEditing} />
            <InfoField label="LinkedIn" value={teacherInfo.socialMedia.linkedin} isEditing={isEditing} />
            <InfoField label="Twitter" value={teacherInfo.socialMedia.twitter} isEditing={isEditing} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value, isEditing, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm text-light-3 mb-1">{label}</label>
      {isEditing ? (
        <input
          type="text"
          className="w-full p-2 bg-dark-1 border border-dark-3 rounded-md text-light-1 focus:outline-none focus:ring-1 focus:ring-cta-1"
          defaultValue={value}
        />
      ) : (
        <p className="text-light-1">{value}</p>
      )}
    </div>
  )
}