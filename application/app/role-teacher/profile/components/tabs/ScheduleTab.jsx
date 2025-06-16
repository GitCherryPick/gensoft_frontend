"use client"

import { useState } from "react"
import { Clock, Plus, Trash2, Edit3, Save, X, MapPin } from 'lucide-react'

export default function ScheduleTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [showAddForm, setShowAddForm] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  
  // Estados para el formulario
  const [newClass, setNewClass] = useState({
    course: '',
    startTime: '',
    endTime: '',
    location: ''
  })

  // Datos del horario con estado
  const [schedule, setSchedule] = useState({
    monday: [],
    tuesday: [{ id: 3, course: "Tecnología Educativa", startTime: "10:00", endTime: "12:00", location: "Laboratorio 3" }],
    wednesday: [],
    thursday: [{ id: 6, course: "Evaluación Educativa", startTime: "11:00", endTime: "13:00", location: "Aula 201" }],
    friday: [],
  })

  const days = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
  ]

  const handleSaveChanges = () => {
    setIsEditing(false)
    setShowAddForm(null)
    setEditingItem(null)
    console.log('Horario guardado:', schedule)
  }

  const handleAddClass = (dayId) => {
    if (!newClass.course || !newClass.startTime || !newClass.endTime || !newClass.location) {
      alert('Por favor, completa todos los campos')
      return
    }

    const newId = Math.max(...Object.values(schedule).flat().map(item => item.id || 0)) + 1
    const newItem = {
      id: newId,
      course: newClass.course,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      location: newClass.location
    }

    setSchedule(prev => ({
      ...prev,
      [dayId]: [...(prev[dayId] || []), newItem].sort((a, b) => a.startTime.localeCompare(b.startTime))
    }))

    setNewClass({ course: '', startTime: '', endTime: '', location: '' })
    setShowAddForm(null)
  }

  const handleDeleteClass = (dayId, itemId) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta clase?')) {
      setSchedule(prev => ({
        ...prev,
        [dayId]: prev[dayId].filter(item => item.id !== itemId)
      }))
    }
  }

  const handleEditClass = (dayId, item) => {
    setEditingItem({ dayId, ...item })
  }

  const handleUpdateClass = () => {
    if (!editingItem.course || !editingItem.startTime || !editingItem.endTime || !editingItem.location) {
      alert('Por favor, completa todos los campos')
      return
    }

    setSchedule(prev => ({
      ...prev,
      [editingItem.dayId]: prev[editingItem.dayId].map(item => 
        item.id === editingItem.id 
          ? { id: editingItem.id, course: editingItem.course, startTime: editingItem.startTime, endTime: editingItem.endTime, location: editingItem.location }
          : item
      ).sort((a, b) => a.startTime.localeCompare(b.startTime))
    }))

    setEditingItem(null)
  }

  const formatTime = (startTime, endTime) => {
    return `${startTime} - ${endTime}`
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header sticky */}
        <div className="sticky top-0 backdrop-blur-sm py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 z-10 border-b border-slate-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-white">Horario Académico</h2>
            </div>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full sm:w-auto justify-center ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save size={16} />
                  <span>Guardar cambios</span>
                </>
              ) : (
                <>
                  <Edit3 size={16} />
                  <span>Editar horario</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="bg-gray-700/50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-semibold text-white text-lg">{day.label}</h3>
                {isEditing && (
                  <button 
                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors w-full sm:w-auto justify-center sm:justify-start"
                    onClick={() => setShowAddForm(showAddForm === day.id ? null : day.id)}
                  >
                    <Plus size={16} className="mr-1" />
                    Añadir clase
                  </button>
                )}
              </div>

              {/* Formulario para añadir clase */}
              {showAddForm === day.id && (
                <div className="px-4 sm:px-6 py-4 bg-gray-700/30 border-b border-gray-600">
                  <h4 className="text-white font-medium mb-3">Nueva clase</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm text-gray-300 mb-1">Materia</label>
                      <input
                        type="text"
                        value={newClass.course}
                        onChange={(e) => setNewClass(prev => ({ ...prev, course: e.target.value }))}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre de la materia"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm text-gray-300 mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={newClass.location}
                        onChange={(e) => setNewClass(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Aula o ubicación"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm text-gray-300 mb-1">Hora inicio</label>
                      <input
                        type="time"
                        value={newClass.startTime}
                        onChange={(e) => setNewClass(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm text-gray-300 mb-1">Hora fin</label>
                      <input
                        type="time"
                        value={newClass.endTime}
                        onChange={(e) => setNewClass(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button
                      onClick={() => handleAddClass(day.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Añadir
                    </button>
                    <button
                      onClick={() => setShowAddForm(null)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="divide-y divide-gray-600">
                {schedule[day.id]?.length > 0 ? (
                  schedule[day.id].map((item) => (
                    <div key={item.id}>
                      {editingItem && editingItem.id === item.id ? (
                        // Formulario de edición
                        <div className="px-4 sm:px-6 py-4 bg-gray-700/30">
                          <h4 className="text-white font-medium mb-3">Editar clase</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Materia</label>
                              <input
                                type="text"
                                value={editingItem.course}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, course: e.target.value }))}
                                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Ubicación</label>
                              <input
                                type="text"
                                value={editingItem.location}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, location: e.target.value }))}
                                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Hora inicio</label>
                              <input
                                type="time"
                                value={editingItem.startTime}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, startTime: e.target.value }))}
                                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-300 mb-1">Hora fin</label>
                              <input
                                type="time"
                                value={editingItem.endTime}
                                onChange={(e) => setEditingItem(prev => ({ ...prev, endTime: e.target.value }))}
                                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <button
                              onClick={handleUpdateClass}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Vista normal del item
                        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-700/30 transition-colors gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold text-lg mb-2 break-words">{item.course}</h4>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm text-gray-300 gap-2 sm:gap-4">
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-blue-400 flex-shrink-0" />
                                <span className="whitespace-nowrap">{formatTime(item.startTime, item.endTime)}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-green-400 flex-shrink-0" />
                                <span className="break-words">{item.location}</span>
                              </div>
                            </div>
                          </div>
                          {isEditing && (
                            <div className="flex gap-2 flex-shrink-0">
                              <button 
                                onClick={() => handleEditClass(day.id, item)}
                                className="text-blue-400 hover:text-blue-300 transition-colors p-2"
                                title="Editar clase"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteClass(day.id, item.id)}
                                className="text-red-400 hover:text-red-300 transition-colors p-2"
                                title="Eliminar clase"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 sm:px-6 py-8 text-center">
                    <Clock size={32} className="mx-auto text-gray-500 mb-3" />
                    <p className="text-gray-400">No hay clases programadas para este día</p>
                    {isEditing && (
                      <button
                        onClick={() => setShowAddForm(day.id)}
                        className="mt-3 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                      >
                        Añadir primera clase
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del horario */}
        <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Resumen Semanal</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {days.map((day) => (
              <div key={day.id} className="text-center">
                <p className="text-gray-300 font-medium text-sm sm:text-base">{day.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">
                  {schedule[day.id]?.length || 0}
                </p>
                <p className="text-xs text-gray-400">clases</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Espaciado inferior */}
        <div className="h-16"></div>
      </div>
    </div>
  )
}