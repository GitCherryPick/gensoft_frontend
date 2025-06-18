"use client"
import { useState } from "react"
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

// Datos de ejemplo para eventos
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
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  // Calendario simple con grid
  const renderCalendar = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const hasEvent = sampleEvents.some((event) => event.date.toDateString() === date.toDateString())
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-colors
            ${
              isSelected
                ? "bg-blue-600 text-white"
                : isToday
                  ? "bg-blue-900/20 text-blue-400 border border-blue-600"
                  : hasEvent
                    ? "bg-green-900/20 text-green-400 hover:bg-green-900/30"
                    : "text-gray-300 hover:bg-gray-800/50"
            }
          `}
        >
          {day}
        </button>,
      )
    }

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <p className="text-gray-400 text-sm">Selecciona una fecha para ver los eventos</p>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="h-10 flex items-center justify-center text-gray-400 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  // Filtrar eventos para la fecha seleccionada
  const eventsForSelectedDate = sampleEvents.filter(
    (event) => selectedDate && event.date.toDateString() === selectedDate.toDateString(),
  )

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <IconPlus className="h-4 w-4" />
              Nuevo Evento
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendario Principal */}
            <div className="lg:col-span-2">{renderCalendar()}</div>

            {/* Eventos del día seleccionado */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <p className="text-gray-400 text-sm">
                  {eventsForSelectedDate.length > 0
                    ? `${eventsForSelectedDate.length} evento${eventsForSelectedDate.length > 1 ? "s" : ""}`
                    : "No hay eventos programados"}
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map((event) => (
                    <div key={event.id} className="border border-gray-600/50 rounded-lg p-4 space-y-3 bg-gray-900/30">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-white text-sm">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded border ${getEventTypeColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </span>
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
                    <span className={`text-xs px-2 py-1 rounded border ${getEventTypeColor(event.type)}`}>
                      {getEventTypeLabel(event.type)}
                    </span>
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
