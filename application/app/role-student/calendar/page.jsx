"use client"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllTasks, getReplicaExercises } from "@/lib/tasks-teacher/task-service"
import { IconClock, IconCalendar, IconBook, IconCode, IconListCheck, IconAlertCircle, IconCheckCircle, IconRefresh } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function CalendarPage() {
  const router = useRouter() // Moved useRouter hook to the top level
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para obtener las tareas (usando tu código exacto)
  async function fetchTasks() {
    try {
      setLoading(true)
      setError(null)

      // Laboratorio tasks (tu código exacto)
      let taskList = []
      try {
        const taskData = await getAllTasks()
        console.log("Datos de tareas:", taskData)
        taskList = Array.isArray(taskData) ? taskData : taskData.data || taskData.tasks || taskData.results || []
      } catch (taskError) {
        console.warn("Failed to fetch task codes, continuing with exercises:", taskError)
      }

      const laboratorioTasks = taskList.map((task, index) => ({
        id: `lab-${task.id}` || `lab-${index + 1}`,
        title: task.title || `Laboratorio Task ${index + 1}`,
        dueDate: task.date_limit ? task.date_limit.split("T")[0] : "2025-06-01",
        dueTime: task.date_limit ? task.date_limit.split("T")[1]?.slice(0, 5) || "12:00" : "12:00",
        status: task.status || "Pendiente",
        description: task.enunciado || "No description available",
        type: "Laboratorio",
        course: task.course_name || "Introducción a Python",
        originalTask: task, // Guardamos la tarea original por si la necesitas
      }))

      // Réplica exercises (tu código exacto)
      let replicaExercises = []
      try {
        replicaExercises = await getReplicaExercises()
        if (!Array.isArray(replicaExercises)) {
          replicaExercises = []
          console.warn("Expected array of replica exercises but got:", replicaExercises)
        }
      } catch (exerciseError) {
        console.warn("Failed to fetch replica exercises:", exerciseError)
      }

      const replicaTasks = replicaExercises.map((exercise, index) => ({
        id: exercise.exercise_id || `rep-${index + 1}`,
        title: exercise.title || `Réplica Exercise ${index + 1}`,
        dueDate: exercise.due_date || "2025-06-01",
        dueTime: exercise.due_time || "12:00",
        status: exercise.status || "Pendiente",
        description: exercise.prompt || "No description available",
        type: "Réplica",
        course: exercise.course_name || "Introducción a Python",
        originalExercise: exercise, // Guardamos el ejercicio original
      }))

      // Combinar todas las tareas
      const allTasks = [...laboratorioTasks, ...replicaTasks]
      setTasks(allTasks)
      console.log(`✅ ${allTasks.length} tareas cargadas correctamente`)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setError("No se pudieron cargar las tareas. Verifica la conexión con el servidor.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const getTaskTypeColor = (type) => {
    switch (type) {
      case "Laboratorio":
        return "bg-blue-900/20 text-blue-400 border-blue-600"
      case "Réplica":
        return "bg-purple-900/20 text-purple-400 border-purple-600"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-600"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return "bg-green-900/20 text-green-400 border-green-600"
      case "En progreso":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-600"
      case "Pendiente":
        return "bg-red-900/20 text-red-400 border-red-600"
      default:
        return "bg-gray-900/20 text-gray-400 border-gray-600"
    }
  }

  const getTaskIcon = (type) => {
    switch (type) {
      case "Laboratorio":
        return <IconCode className="h-4 w-4" />
      case "Réplica":
        return <IconListCheck className="h-4 w-4" />
      default:
        return <IconBook className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completado":
        return <IconCheckCircle className="h-4 w-4" />
      case "En progreso":
        return <IconClock className="h-4 w-4" />
      case "Pendiente":
        return <IconAlertCircle className="h-4 w-4" />
      default:
        return <IconAlertCircle className="h-4 w-4" />
    }
  }

  // Función para navegar a resolver tareas
  const navigateToTask = (task) => {
    // Usar la ruta correcta que tienes en tu proyecto
    if (task.type === "Laboratorio") {
      // Para laboratorio, necesitamos el ID sin el prefijo "lab-"
      const taskId = task.id.replace("lab-", "")
      router.push(`/role-student/homework?type=laboratory&id=${taskId}`)
    } else if (task.type === "Réplica") {
      // Para réplica, usamos el ID directamente
      router.push(`/role-student/homework?type=replica&id=${task.id}`)
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
      const dateString = date.toISOString().split("T")[0]

      const tasksForDay = tasks.filter((task) => task.dueDate === dateString)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`
            h-10 w-10 rounded-lg text-sm font-medium transition-colors relative
            ${
              isSelected
                ? "bg-blue-600 text-white"
                : isToday
                  ? "bg-blue-900/20 text-blue-400 border border-blue-600"
                  : tasksForDay.length > 0
                    ? "bg-green-900/20 text-green-400 hover:bg-green-900/30"
                    : "text-gray-300 hover:bg-gray-800/50"
            }
          `}
        >
          {day}
          {tasksForDay.length > 0 && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {tasksForDay.length}
            </div>
          )}
        </button>,
      )
    }

    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <p className="text-gray-400 text-sm">Selecciona una fecha para ver las tareas programadas</p>
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

  // Filtrar tareas para la fecha seleccionada
  const selectedDateString = selectedDate.toISOString().split("T")[0]
  const tasksForSelectedDate = tasks.filter((task) => task.dueDate === selectedDateString)

  // Tareas urgentes (vencen hoy o están atrasadas)
  const urgentTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    const today = new Date()
    return (task.status !== "Completado" && dueDate < today) || dueDate.toDateString() === today.toDateString()
  })

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-dark-1 relative flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-white text-lg">Cargando tareas...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-dark-1 relative flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4">
            <IconAlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchTasks}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <IconRefresh className="h-4 w-4" />
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-dark-1 relative">
      <ScrollArea className="h-full w-full">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Calendario de Tareas</h1>
              <p className="text-gray-400 mt-1">
                Gestiona tus tareas de laboratorio y réplicas - {tasks.length} tareas totales
              </p>
            </div>
            <button
              onClick={fetchTasks}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>

          {/* Alerta de tareas urgentes */}
          {urgentTasks.length > 0 && (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <div className="flex items-center">
                <IconAlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-red-300">
                  <span className="font-semibold">¡Atención!</span> Tienes{" "}
                  <span className="font-semibold">{urgentTasks.length}</span>{" "}
                  {urgentTasks.length === 1 ? "tarea urgente" : "tareas urgentes"}.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendario Principal */}
            <div className="lg:col-span-2">{renderCalendar()}</div>

            {/* Tareas del día seleccionado */}
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
                  {tasksForSelectedDate.length > 0
                    ? `${tasksForSelectedDate.length} tarea${tasksForSelectedDate.length > 1 ? "s" : ""} programada${tasksForSelectedDate.length > 1 ? "s" : ""}`
                    : "No hay tareas programadas"}
                </p>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {tasksForSelectedDate.length > 0 ? (
                  tasksForSelectedDate.map((task) => (
                    <div key={task.id} className="border border-gray-600/50 rounded-lg p-4 space-y-3 bg-gray-900/30">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-white text-sm">{task.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded border ${getTaskTypeColor(task.type)}`}>
                          {task.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <IconClock className="h-3 w-3" />
                          Vence: {task.dueTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <IconBook className="h-3 w-3" />
                          {task.course}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 mt-2">{task.description}</p>

                      {/* Agregar botón de navegación */}
                      <button
                        onClick={() => navigateToTask(task)}
                        className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                          task.status === "Pendiente"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-600 hover:bg-gray-700 text-gray-200"
                        }`}
                      >
                        {task.status === "Pendiente" ? "Resolver Tarea" : "Ver Detalles"}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <IconCalendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No hay tareas para esta fecha</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Todas las tareas próximas */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Próximas Tareas</h2>
              <p className="text-gray-400 text-sm">Todas tus tareas programadas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-600/50 rounded-lg p-4 space-y-3 bg-gray-900/30 hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTaskIcon(task.type)}
                      <h4 className="font-medium text-white text-sm">{task.title}</h4>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border ${getTaskTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleDateString("es-ES")}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock className="h-3 w-3" />
                      {task.dueTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconBook className="h-3 w-3" />
                      {task.course}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mt-2 line-clamp-2">{task.description}</p>

                  {/* Agregar botón de navegación */}
                  <button
                    onClick={() => navigateToTask(task)}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                      task.status === "Pendiente"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-600 hover:bg-gray-700 text-gray-200"
                    }`}
                  >
                    {task.status === "Pendiente" ? "Resolver" : "Ver"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
