"use client"

import { useState } from "react"
import { Clock, Plus, Trash2 } from 'lucide-react'

export default function ScheduleTab() {
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo
  const schedule = {
    monday: [
      { id: 1, course: "Metodologías de Enseñanza", time: "09:00 - 11:00", location: "Aula 201" },
      { id: 2, course: "Tutoría", time: "15:00 - 17:00", location: "Despacho 105" },
    ],
    tuesday: [{ id: 3, course: "Tecnología Educativa", time: "10:00 - 12:00", location: "Laboratorio 3" }],
    wednesday: [
      { id: 4, course: "Diseño Curricular", time: "09:00 - 11:00", location: "Aula 305" },
      { id: 5, course: "Reunión Departamento", time: "16:00 - 17:30", location: "Sala de Juntas" },
    ],
    thursday: [{ id: 6, course: "Evaluación Educativa", time: "11:00 - 13:00", location: "Aula 201" }],
    friday: [
      { id: 7, course: "Tutoría", time: "10:00 - 12:00", location: "Despacho 105" },
      { id: 8, course: "Investigación Educativa", time: "15:00 - 17:00", location: "Aula 102" },
    ],
  }

  const days = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-light-1">Horario</h2>
        <button
          className="px-3 py-1.5 bg-cta-1 text-black rounded-md text-sm font-medium"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Guardar cambios" : "Editar horario"}
        </button>
      </div>

      <div className="space-y-6">
        {days.map((day) => (
          <div key={day.id} className="bg-dark-1 rounded-lg border border-dark-3 overflow-hidden">
            <div className="bg-dark-3 px-4 py-3 flex justify-between items-center">
              <h3 className="font-medium text-light-1">{day.label}</h3>
              {isEditing && (
                <button className="flex items-center text-xs text-cta-1">
                  <Plus size={14} className="mr-1" />
                  Añadir clase
                </button>
              )}
            </div>

            <div className="divide-y divide-dark-3">
              {schedule[day.id]?.length > 0 ? (
                schedule[day.id].map((item) => (
                  <div key={item.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-light-1 font-medium">{item.course}</h4>
                      <div className="flex items-center text-sm text-light-3 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{item.time}</span>
                        <span className="mx-2">•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                    {isEditing && (
                      <button className="text-light-3 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-light-3">
                  <p>No hay clases programadas para este día</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}