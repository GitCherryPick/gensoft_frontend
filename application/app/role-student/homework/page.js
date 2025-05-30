'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

// Datos de ejemplo por ahora
const assignedExercises = [
  { 
    id: 1, 
    title: "Ejercicio 1: Crea una lista en Python", 
    dueDate: "2025-06-05", 
    dueTime: "14:00", 
    status: "Pendiente", 
    description: "Crea una lista en Python y realiza operaciones básicas.", 
    type: "Réplica", 
    course: "Listas y Tuplas" 
  },
  { 
    id: 2, 
    title: "Ejercicio 2: Ejercicios de Python inicial", 
    dueDate: "2025-05-28", 
    dueTime: "09:30", 
    status: "Atrasado", 
    description: "Resolver 10 ejercicios básicos de Python.", 
    type: "Laboratorio", 
    course: "Introducción a Python" 
  },
  { 
    id: 3, 
    title: "Ejercicio 3: Ejercicios con listas en Python", 
    dueDate: "2025-05-30", 
    dueTime: "16:00", 
    status: "Pendiente", 
    description: "Ejercicios avanzados con listas en Python.", 
    type: "Réplica", 
    course: "Listas y Tuplas" 
  },
  { 
    id: 4, 
    title: "Ejercicio 4: Resuelve las siguientes funciones", 
    dueDate: "2025-05-25", 
    dueTime: "11:00", 
    status: "Completado", 
    description: "Crea y resuelve funciones en Python.", 
    type: "Laboratorio", 
    course: "Funciones en Python" 
  },
];

export default function Homework() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [exercises, setExercises] = useState(assignedExercises);
  const [filteredExercises, setFilteredExercises] = useState(assignedExercises);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [timeFilter, setTimeFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todas");
  const [courseFilter, setCourseFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("dueDateAsc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let filtered = [...exercises];

    // Filtrar por estado
    if (statusFilter !== "Todos") {
      filtered = filtered.filter((exercise) => exercise.status === statusFilter);
    }

    // Filtrar por período de tiempo
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (timeFilter === "Hoy") {
      filtered = filtered.filter(
        (exercise) => new Date(exercise.dueDate).toDateString() === today.toDateString()
      );
    } else if (timeFilter === "Esta semana") {
      filtered = filtered.filter((exercise) => {
        const dueDate = new Date(exercise.dueDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
      });
    } else if (timeFilter === "Este mes") {
      filtered = filtered.filter((exercise) => {
        const dueDate = new Date(exercise.dueDate);
        return dueDate >= startOfMonth && dueDate <= endOfMonth;
      });
    }

    // Filtrar por tipo
    if (typeFilter !== "Todas") {
      filtered = filtered.filter((exercise) => exercise.type === typeFilter);
    }

    // Filtrar por curso
    if (courseFilter !== "Todos") {
      filtered = filtered.filter((exercise) => exercise.course === courseFilter);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Ordenar los resultados
    if (sortBy === "dueDateAsc") {
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else if (sortBy === "dueDateDesc") {
      filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    } else if (sortBy === "titleAsc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredExercises(filtered);
  }, [statusFilter, timeFilter, typeFilter, courseFilter, sortBy, searchQuery, exercises]);

  if (!isMounted) return null;

  const getStatusStyles = (status, dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (status === "Completado") return "bg-green-900/50 text-green-300";
    if (status === "Pendiente") return "bg-yellow-900/50 text-yellow-300";
    if (status === "Atrasado" || due < today) return "bg-red-900/50 text-red-300";
    return "bg-yellow-900/50 text-yellow-300";
  };

  const getTypeStyles = (type) => {
    if (type === "Laboratorio") return "bg-blue-900/50 text-blue-300";
    if (type === "Réplica") return "bg-orange-900/50 text-orange-300";
    return "bg-gray-900/50 text-gray-300";
  };

  const urgentTasks = exercises.filter((exercise) => {
    const dueDate = new Date(exercise.dueDate);
    const today = new Date();
    return (
      (exercise.status !== "Completado" && dueDate < today) ||
      dueDate.toDateString() === today.toDateString()
    );
  });

  const resetFilters = () => {
    setStatusFilter("Todos");
    setTimeFilter("Todos");
    setTypeFilter("Todas");
    setCourseFilter("Todos");
    setSortBy("dueDateAsc");
    setSearchQuery("");
  };

  // Función para formatear la fecha al formato DD/MM/YY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-11, por eso +1
    const year = String(date.getFullYear()).slice(-2); // Últimos dos dígitos del año
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-dark-1">
      {/* head */}
      <div className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 h-56 md:h-64 flex items-center justify-center px-4">
        <div className="text-center space-y-2">
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Ejercicios Asignados
          </h3>
          <p className="text-neutral-300 text-sm md:text-base">
            Revisa tus tareas y fechas de entrega
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Advertencia en caso de que la tarea ya está próxima */}
        {urgentTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-center space-x-3 text-red-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-light-2">
              Tienes <span className="font-semibold text-light-1">{urgentTasks.length}</span>{" "}
              {urgentTasks.length === 1 ? "tarea urgente" : "tareas urgentes"} (atrasadas o que vencen hoy).
            </p>
          </motion.div>
        )}

        {/* Filtros y Buscador */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-light-1">Tus Ejercicios</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-cta-1 hover:text-cta-1/80 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Filtro por Estado */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full p-2 border rounded-lg appearance-none bg-dark-2 text-sm transition-all text-light-2 ${
                    statusFilter !== "Todos"
                      ? "border-cta-1 ring-1 ring-cta-1"
                      : "border-neutral-700"
                  } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
                >
                  <option value="Todos" className="bg-dark-2 text-light-2">Estado: Todos</option>
                  <option value="Pendiente" className="bg-dark-2 text-light-2">Pendiente</option>
                  <option value="Atrasado" className="bg-dark-2 text-light-2">Atrasado</option>
                  <option value="Completado" className="bg-dark-2 text-light-2">Completado</option>
                </select>
              </div>

              {/* Filtro por Tiempo */}
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className={`w-full p-2 border rounded-lg appearance-none bg-dark-2 text-sm transition-all text-light-2 ${
                    timeFilter !== "Todos"
                      ? "border-cta-1 ring-1 ring-cta-1"
                      : "border-neutral-700"
                  } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
                >
                  <option value="Todos" className="bg-dark-2 text-light-2">Período: Todos</option>
                  <option value="Hoy" className="bg-dark-2 text-light-2">Hoy</option>
                  <option value="Esta semana" className="bg-dark-2 text-light-2">Esta semana</option>
                  <option value="Este mes" className="bg-dark-2 text-light-2">Este mes</option>
                </select>
              </div>

              {/* Filtro por tipo */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`w-full p-2 border rounded-lg appearance-none bg-dark-2 text-sm transition-all text-light-2 ${
                    typeFilter !== "Todas"
                      ? "border-cta-1 ring-1 ring-cta-1"
                      : "border-neutral-700"
                  } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
                >
                  <option value="Todas" className="bg-dark-2 text-light-2">Tipo: Todas</option>
                  <option value="Laboratorio" className="bg-dark-2 text-light-2">Laboratorio</option>
                  <option value="Réplica" className="bg-dark-2 text-light-2">Réplica</option>
                </select>
              </div>

              {/* Filtro por Curso */}
              <div className="relative">
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className={`w-full p-2 border rounded-lg appearance-none bg-dark-2 text-sm transition-all text-light-2 ${
                    courseFilter !== "Todos"
                      ? "border-cta-1 ring-1 ring-cta-1"
                      : "border-neutral-700"
                  } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
                >
                  <option value="Todos" className="bg-dark-2 text-light-2">Curso: Todos</option>
                  <option value="Introducción a Python" className="bg-dark-2 text-light-2">Introducción a Python</option>
                  <option value="Listas y Tuplas" className="bg-dark-2 text-light-2">Listas y Tuplas</option>
                  <option value="Funciones en Python" className="bg-dark-2 text-light-2">Funciones en Python</option>
                </select>
              </div>

              {/* Ordenar */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full p-2 border rounded-lg appearance-none bg-dark-2 text-sm transition-all text-light-2 ${
                    sortBy !== "dueDateAsc"
                      ? "border-cta-1 ring-1 ring-cta-1"
                      : "border-neutral-700"
                  } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
                >
                  <option value="dueDateAsc" className="bg-dark-2 text-light-2">Ordenar: Fecha (Asc)</option>
                  <option value="dueDateDesc" className="bg-dark-2 text-light-2">Fecha (Desc)</option>
                  <option value="titleAsc" className="bg-dark-2 text-light-2">Título (A-Z)</option>
                  <option value="titleDesc" className="bg-dark-2 text-light-2">Título (Z-A)</option>
                </select>
              </div>
            </div>

            {/* Buscador */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar ejercicios por título o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-2 pl-10 border rounded-lg text-sm transition-all bg-dark-2 text-light-2 placeholder:text-light-3 ${
                  searchQuery
                    ? "border-cta-1 ring-1 ring-cta-1"
                    : "border-neutral-700"
                } focus:ring-2 focus:ring-cta-1 focus:border-cta-1`}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Lista de Ejercicios */}
            {filteredExercises.length === 0 ? (
              <p className="text-light-3 text-center py-10">
                No se encontraron ejercicios con los filtros seleccionados.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredExercises.map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-dark-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-neutral-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-light-1">{exercise.title}</h3>
                          <p className="text-sm text-light-3">{exercise.course}</p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyles(
                            exercise.status,
                            exercise.dueDate
                          )}`}
                        >
                          {exercise.status}
                        </span>
                      </div>
                      <p className="text-light-3 text-sm mb-2">{exercise.description}</p>
                      {/* Fecha */}
                      <div className="flex items-center text-sm text-light-3 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Fecha de entrega: {formatDate(exercise.dueDate)}
                      </div>
                      {/* Hora */}
                      <div className="flex items-center text-sm text-light-3 mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Hora de entrega: {exercise.dueTime}
                      </div>
                      <div className="flex items-center text-sm text-light-3 mb-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeStyles(
                            exercise.type
                          )}`}
                        >
                          Tipo: {exercise.type}
                        </span>
                      </div>
                      <button
                        className={`w-full py-2 rounded-lg transition-colors duration-200 ${
                          exercise.status === "Pendiente"
                            ? "bg-cta-1 text-dark-1 hover:bg-cta-1/80"
                            : "bg-neutral-700 text-light-2 hover:bg-neutral-600"
                        }`}
                      >
                        {exercise.status === "Pendiente" ? "Enviar Solución" : "Ver Detalles"}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}