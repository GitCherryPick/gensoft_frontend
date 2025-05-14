"use client"

import { useState } from "react"
import { Plus, Trash2, Download, ExternalLink } from 'lucide-react'
import Image from "next/image"

export default function CertificationsTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo
  const certifications = [
    {
      id: 1,
      title: "Certificación en Metodologías Activas",
      issuer: "Instituto de Innovación Educativa",
      date: "Junio 2022",
      expiration: "Junio 2025",
      credentialId: "MA-2022-1234",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      id: 2,
      title: "Experto en Diseño de Cursos Online",
      issuer: "Universidad Digital Global",
      date: "Marzo 2021",
      expiration: "No expira",
      credentialId: "DCO-2021-5678",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      id: 3,
      title: "Certificación en Evaluación por Competencias",
      issuer: "Consejo de Educación Superior",
      date: "Noviembre 2020",
      expiration: "Noviembre 2023",
      credentialId: "EC-2020-9012",
      image: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-1">Certificaciones</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
              onClick={() => setIsEditing(false)}
            >
              Guardar cambios
            </button>
          ) : (
            <>
              <button
                className="flex items-center px-3 py-1.5 bg-dark-3 text-light-1 rounded-md text-sm"
                onClick={() => {}}
              >
                <Plus size={16} className="mr-1" />
                Añadir
              </button>
              <button
                className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-dark-1 rounded-lg border border-dark-3 overflow-hidden">
            <div className="relative h-40 w-full">
              <Image src={cert.image || "/placeholder.svg"} alt={cert.title} className="object-cover" fill />
              {isEditing && (
                <button className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-light-1 mb-1">{cert.title}</h3>
              <p className="text-sm text-light-2 mb-3">{cert.issuer}</p>

              <div className="grid grid-cols-2 gap-2 text-xs text-light-3 mb-4">
                <div>
                  <span className="block">Fecha de emisión</span>
                  <span className="text-light-2">{cert.date}</span>
                </div>
                <div>
                  <span className="block">Expiración</span>
                  <span className="text-light-2">{cert.expiration}</span>
                </div>
                <div className="col-span-2">
                  <span className="block">ID de credencial</span>
                  <span className="text-light-2">{cert.credentialId}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-1.5 bg-dark-3 text-light-1 rounded-md text-xs"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Ver credencial
                </a>
                <button className="flex items-center px-3 py-1.5 bg-dark-3 text-light-1 rounded-md text-xs">
                  <Download size={14} className="mr-1" />
                  Descargar
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Añadir nueva certificación (visible solo en modo edición) */}
        {isEditing && (
          <div className="bg-dark-1 rounded-lg border border-dashed border-dark-3 flex items-center justify-center h-64 cursor-pointer">
            <div className="text-center">
              <Plus size={24} className="mx-auto mb-2 text-light-3" />
              <p className="text-light-3">Añadir certificación</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}