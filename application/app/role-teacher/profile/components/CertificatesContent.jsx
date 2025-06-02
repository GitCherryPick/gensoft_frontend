"use client"

import Image from "next/image"
import { Download, Share2 } from 'lucide-react'

export default function CertificatesContent() {
  // Datos de ejemplo para certificados de docente
  const certificates = [
    {
      id: 1,
      title: "Metodologías de Enseñanza Avanzada",
      issuer: "Universidad Mayor de San Andrés",
      date: "15 Marzo 2025",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Tecnologías Educativas Digitales",
      issuer: "Ministerio de Educación de Bolivia",
      date: "20 Abril 2025",
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Mis Certificados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-[#1e2132] rounded-lg overflow-hidden">
            <div className="h-[200px] relative">
              <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium mb-1">{cert.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Emisor: {cert.issuer}</p>
                <p className="text-gray-400 text-sm">Fecha: {cert.date}</p>
              </div>
              <div className="flex mt-4 gap-4">
                <button className="flex items-center text-[#7c5cfc] text-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Descargar
                </button>
                <button className="flex items-center text-[#7c5cfc] text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}