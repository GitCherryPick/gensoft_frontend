"use client"
import { IconAlertCircle, IconX, IconClock, IconMapPin, IconBell, IconCode, IconListCheck } from "@tabler/icons-react"
import { useState } from "react"

export default function NotificationBanner({ tasks = [], urgentTasks = [] }) {
  const [isVisible, setIsVisible] = useState(true)

  // El banner está oculto cuando no hay tareas urgentes o si el usuario lo ha cerrado
  // Si no hay tareas urgentes, no se muestra el banner 
  if (!isVisible || urgentTasks.length === 0) {
    return null
  }

  // Fecha actual para identificar tareas de hoy
  const today = new Date().toDateString()
  const todayUrgentTasks = urgentTasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toDateString()
    return taskDate === today
  })

  const overdueUrgentTasks = urgentTasks.filter((task) => {
    const taskDate = new Date(task.dueDate)
    const now = new Date()
    return taskDate < now && task.status !== "Completado"
  })

  const getTaskTypeColor = (type) => {
    switch (type) {
      case "Laboratorio":
        return "text-blue-400"
      case "Réplica":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const getTaskIcon = (type) => {
    switch (type) {
      case "Laboratorio":
        return <IconCode className="h-4 w-4" />
      case "Réplica":
        return <IconListCheck className="h-4 w-4" />
      default:
        return <IconBell className="h-4 w-4" />
    }
  }

  const getPriorityLevel = () => {
    if (overdueUrgentTasks.length > 0) return "overdue"
    if (todayUrgentTasks.length > 0) return "today"
    return "upcoming"
  }

  const getBannerStyle = (priority) => {
    switch (priority) {
      case "overdue":
        return "bg-gradient-to-r from-red-500/20 to-red-400/10 border border-red-500/30"
      case "today":
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30"
      default:
        return "bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-500/30"
    }
  }

  const getBannerIcon = (priority) => {
    switch (priority) {
      case "overdue":
        return <IconAlertCircle className="h-5 w-5 text-red-400" />
      case "today":
        return <IconBell className="h-5 w-5 text-yellow-400" />
      default:
        return <IconBell className="h-5 w-5 text-blue-400" />
    }
  }
  
  // Mensaje del banner según el tipo de tarea
  const getBannerMessage = (priority) => {
    if (overdueUrgentTasks.length > 0) {
      return `🚨 ¡Tienes ${overdueUrgentTasks.length} tarea${overdueUrgentTasks.length > 1 ? "s" : ""} atrasada${overdueUrgentTasks.length > 1 ? "s" : ""}!`
    }
    if (todayUrgentTasks.length > 0) {
      return `📢 ¡Tienes ${todayUrgentTasks.length} tarea${todayUrgentTasks.length > 1 ? "s" : ""} que vence${todayUrgentTasks.length > 1 ? "n" : ""} hoy!`
    }
    return `⚠️ Tienes ${urgentTasks.length} tarea${urgentTasks.length > 1 ? "s" : ""} urgente${urgentTasks.length > 1 ? "s" : ""}`
  }

  const priority = getPriorityLevel()

  return (
    <div className={`w-full ${getBannerStyle(priority)} rounded-lg p-4 mb-6 animate-slide-down`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-0.5">{getBannerIcon(priority)}</div>

          <div className="flex-1">
            <h3 className="text-white font-semibold mb-3">{getBannerMessage(priority)}</h3>

            <div className="space-y-2">
              {/* Mostrar tareas atrasadas primero */}
              {overdueUrgentTasks.slice(0, 2).map((task, index) => (
                <div
                  key={`overdue-${task.id || index}`}
                  className="flex items-center gap-2 text-sm p-3 rounded-md bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getTaskIcon(task.type)}
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-red-300 font-medium block truncate">{task.title}</span>
                    <div className="flex items-center gap-2 text-xs text-red-400 mt-1">
                      <span className={`px-2 py-1 rounded ${getTaskTypeColor(task.type)} bg-gray-800/50`}>
                        {task.type}
                      </span>
                      <span>•</span>
                      <span className="truncate">{task.course}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-red-400 text-xs flex-shrink-0">
                    <IconClock className="h-3 w-3" />
                    <span>Venció</span>
                  </div>
                </div>
              ))}

              {/* Mostrar tareas de hoy */}
              {todayUrgentTasks.slice(0, overdueUrgentTasks.length > 0 ? 1 : 2).map((task, index) => (
                <div
                  key={`today-${task.id || index}`}
                  className="flex items-center gap-2 text-sm p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20"
                >
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getTaskIcon(task.type)}
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-yellow-200 font-medium block truncate">{task.title}</span>
                    <div className="flex items-center gap-2 text-xs text-yellow-400 mt-1">
                      <span className={`px-2 py-1 rounded ${getTaskTypeColor(task.type)} bg-gray-800/50`}>
                        {task.type}
                      </span>
                      <span>•</span>
                      <span className="truncate">{task.course}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 text-xs flex-shrink-0">
                    <IconClock className="h-3 w-3" />
                    <span>{task.dueTime}</span>
                  </div>
                </div>
              ))}

              {/* Para mostrar otras tareas urgentes */}
              {urgentTasks
                .filter((task) => !overdueUrgentTasks.includes(task) && !todayUrgentTasks.includes(task))
                .slice(0, 1)
                .map((task, index) => (
                  <div
                    key={`urgent-${task.id || index}`}
                    className="flex items-center gap-2 text-sm p-3 rounded-md bg-blue-500/10 border border-blue-500/20"
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getTaskIcon(task.type)}
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-blue-200 font-medium block truncate">{task.title}</span>
                      <div className="flex items-center gap-2 text-xs text-blue-400 mt-1">
                        <span className={`px-2 py-1 rounded ${getTaskTypeColor(task.type)} bg-gray-800/50`}>
                          {task.type}
                        </span>
                        <span>•</span>
                        <span className="truncate">{task.course}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 text-xs flex-shrink-0">
                      <IconMapPin className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>
                ))}

              {urgentTasks.length > 4 && (
                <div className="text-gray-400 text-sm pl-4 pt-2">
                  ... y {urgentTasks.length - 4} tarea{urgentTasks.length - 4 > 1 ? "s" : ""} más
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded-md transition-colors ml-4"
          aria-label="Cerrar notificación"
        >
          <IconX className="h-4 w-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  )
}
