"use client"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  IconPlus,
  IconClock,
  IconMapPin,
  IconCalendar,
  IconBook,
  IconDevicesQuestion,
  IconListCheck,
} from "@tabler/icons-react"

// Datos de ejemplo para eventos (adaptados a tu contexto educativo)
const sampleEvents = [
  {
    id: 1,
    title: "Examen de Matemáticas",
    date: new Date(2024, 11, 20),
    time: "10:00 AM",
    type: "exam",
    location: "Aula 101",
    course: "Matemáticas Avanzadas",
  },
  {
    id: 2,
    title: "Entrega Proyecto Final",
    date: new Date(2024, 11, 22),
    time: "11:59 PM",
    type: "homework",
    location: "Plataforma Online",
    course: "Programación Web",
  },
  {
    id: 3,
    title: "Clase de Historia",
    date: new Date(2024, 11, 18),
    time: "2:00 PM",
    type: "class",
    location: "Aula 205",
    course: "Historia Universal",
  },
  {
    id: 4,
    title: "Taller de Programación",
    date: new Date(2024, 11, 25),
    time: "9:00 AM",
    type: "class",
    location: "Lab. Computación",
    course: "Algoritmos",
  },
]

export default function StudentCalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Filtrar eventos para la fecha seleccionada
  const eventsForSelectedDate = sampleEvents.filter(
    (event) => selectedDate && event.date.toDateString() === selectedDate.toDateString(),
  )

  // Obtener fechas que tienen eventos
  const datesWithEvents = sampleEvents.map((event) => event.date)

  const getEventTypeColor = (type) => {
    switch (type) {
      case "exam":
        return "bg-red-900/20 text-red-400 border-red-600"
      case "homework":
        return "bg-blue-900/20 text-blue-400 border-blue-600"
      case "class":
        return "bg-green-900/20 text-green-400 border-green-600"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-600"
    }
  }

  const getEventTypeLabel = (type) => {
    switch (type) {
      case "exam":
        return "Examen"
      case "homework":
        return "Tarea"
      case "class":
        return "Clase"
      default:
        return "Evento"
    }
  }

  const getEventIcon = (type) => {
    switch (type) {
      case "exam":
        return <IconDevicesQuestion className="h-4 w-4" />
      case "homework":
        return <IconListCheck className="h-4 w-4" />
      case "class":
        return <IconBook className="h-4 w-4" />
      default:
        return <IconCalendar className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen w-full bg-dark-1 relative">
      <ScrollArea className="h-full w-full">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Calendario Académico</h1>
              <p className="text-gray-400 mt-1">Gestiona tus eventos, tareas y clases</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <IconPlus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendario Principal */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Calendario</h2>
                  <p className="text-gray-400 text-sm">Selecciona una fecha para ver los eventos programados</p>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-gray-600/50 w-full bg-gray-900/30"
                  modifiers={{
                    hasEvents: datesWithEvents,
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: "rgb(59 130 246 / 0.2)",
                      color: "rgb(59 130 246)",
                      fontWeight: "bold",
                    },
                  }}
                />
              </div>
            </div>

            {/* Eventos del día seleccionado */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("es-ES", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "Selecciona una fecha"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {eventsForSelectedDate.length > 0
                    ? `${eventsForSelectedDate.length} evento${eventsForSelectedDate.length > 1 ? "s" : ""} programado${eventsForSelectedDate.length > 1 ? "s" : ""}`
                    : "No hay eventos programados"}
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map((event) => (
                    <div key={event.id} className="border border-gray-600/50 rounded-lg p-4 space-y-3 bg-gray-900/30">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-white text-sm">{event.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <IconClock className="h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <IconMapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <IconBook className="h-3 w-3" />
                          {event.course}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <IconCalendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No hay eventos para esta fecha</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Próximos Eventos</h2>
              <p className="text-gray-400 text-sm">Eventos programados para los próximos días</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-600/50 rounded-lg p-4 space-y-3 bg-gray-900/30 hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <h4 className="font-medium text-white text-sm">{event.title}</h4>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="h-3 w-3" />
                      {event.date.toLocaleDateString("es-ES")}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconMapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconBook className="h-3 w-3" />
                      {event.course}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
