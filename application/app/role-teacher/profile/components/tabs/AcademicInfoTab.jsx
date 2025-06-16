"use client"

import { useState } from "react"
import { Plus, Trash2 } from 'lucide-react'

export default function AcademicInfoTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo
  const academicInfo = {
    education: [
      {
        id: 1,
        degree: "Doctorado en Ciencias de la Educación",
        institution: "Universidad Complutense de Madrid",
        year: "2010",
        description: "Tesis: 'Innovación pedagógica en entornos digitales'",
      },
      {
        id: 2,
        degree: "Máster en Tecnología Educativa",
        institution: "Universidad de Barcelona",
        year: "2005",
        description: "Especialización en diseño de entornos virtuales de aprendizaje",
      },
      {
        id: 3,
        degree: "Licenciatura en Pedagogía",
        institution: "Universidad de Salamanca",
        year: "2003",
        description: "",
      },
    ],
    experience: [
      {
        id: 1,
        position: "Profesora Titular",
        institution: "Universidad Tecnológica",
        period: "2015 - Presente",
        description: "Docencia en grado y postgrado. Coordinación del departamento de innovación educativa.",
      },
      {
        id: 2,
        position: "Profesora Asociada",
        institution: "Universidad de Madrid",
        period: "2010 - 2015",
        description: "Docencia en el área de tecnología educativa y metodologías activas.",
      },
      {
        id: 3,
        position: "Investigadora",
        institution: "Centro de Investigación Educativa",
        period: "2008 - 2010",
        description: "Participación en proyectos de investigación sobre aprendizaje digital.",
      },
    ],
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-1">Información Académica</h2>
        <button
          className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Guardar cambios" : "Editar información"}
        </button>
      </div>

      {/* Formación académica */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-light-2">Formación académica</h3>
          {isEditing && (
            <button className="flex items-center text-sm text-cta-1">
              <Plus size={16} className="mr-1" />
              Añadir formación
            </button>
          )}
        </div>

        <div className="space-y-4">
          {academicInfo.education.map((item) => (
            <div key={item.id} className="p-4 bg-dark-1 rounded-md border border-dark-3 relative">
              {isEditing && (
                <button className="absolute top-3 right-3 text-light-3 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h4 className="font-medium text-light-1">{item.degree}</h4>
                <span className="text-sm text-light-3">{item.year}</span>
              </div>
              <p className="text-light-2 text-sm">{item.institution}</p>
              {item.description && <p className="text-light-3 text-sm mt-2">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Experiencia profesional */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-light-2">Experiencia profesional</h3>
          {isEditing && (
            <button className="flex items-center text-sm text-cta-1">
              <Plus size={16} className="mr-1" />
              Añadir experiencia
            </button>
          )}
        </div>

        <div className="space-y-4">
          {academicInfo.experience.map((item) => (
            <div key={item.id} className="p-4 bg-dark-1 rounded-md border border-dark-3 relative">
              {isEditing && (
                <button className="absolute top-3 right-3 text-light-3 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h4 className="font-medium text-light-1">{item.position}</h4>
                <span className="text-sm text-light-3">{item.period}</span>
              </div>
              <p className="text-light-2 text-sm">{item.institution}</p>
              {item.description && <p className="text-light-3 text-sm mt-2">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}