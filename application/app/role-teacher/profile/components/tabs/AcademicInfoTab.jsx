"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, Save, X } from 'lucide-react'

export default function AcademicInfoTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [editingEducation, setEditingEducation] = useState(null)
  const [editingExperience, setEditingExperience] = useState(null)
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [showExperienceForm, setShowExperienceForm] = useState(false)

  // Estado inicial de datos
  const [academicInfo, setAcademicInfo] = useState({
    education: [
      {
        id: 1,
        degree: "Doctorado en Ciencias de la Educación",
        institution: "Universidad Complutense de Madrid",
        
        description: "Tesis: 'Innovación pedagógica en entornos digitales'",
      },
    ],
    experience: [
      {
        id: 1,
        position: "Profesora Titular",
        institution: "Universidad Tecnológica",

        description: "Docencia en grado y postgrado. Coordinación del departamento de innovación educativa.",
      },
    ],
  })

  // Estados para formularios
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
  
    description: ''
  })

  const [newExperience, setNewExperience] = useState({
    position: '',
    institution: '',
   
    description: ''
  })

  // Funciones para educación
  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      const id = Math.max(0, ...academicInfo.education.map(e => e.id)) + 1
      setAcademicInfo(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id }]
      }))
      setNewEducation({ degree: '', institution: '', year: '', description: '' })
      setShowEducationForm(false)
    }
  }

  const handleDeleteEducation = (id) => {
    setAcademicInfo(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }))
  }

  const handleEditEducation = (item) => {
    setEditingEducation({ ...item })
  }

  const handleSaveEducation = () => {
    setAcademicInfo(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === editingEducation.id ? editingEducation : item
      )
    }))
    setEditingEducation(null)
  }

  // Funciones para experiencia
  const handleAddExperience = () => {
    if (newExperience.position && newExperience.institution && newExperience.period) {
      const id = Math.max(0, ...academicInfo.experience.map(e => e.id)) + 1
      setAcademicInfo(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id }]
      }))
      setNewExperience({ position: '', institution: '', period: '', description: '' })
      setShowExperienceForm(false)
    }
  }

  const handleDeleteExperience = (id) => {
    setAcademicInfo(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id)
    }))
  }

  const handleEditExperience = (item) => {
    setEditingExperience({ ...item })
  }

  const handleSaveExperience = () => {
    setAcademicInfo(prev => ({
      ...prev,
      experience: prev.experience.map(item => 
        item.id === editingExperience.id ? editingExperience : item
      )
    }))
    setEditingExperience(null)
  }

  // Componente para formulario de educación
  const EducationForm = ({ data, onChange, onSave, onCancel, isNew = false }) => (
    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600 space-y-3">
      <input
        type="text"
        placeholder="Título del grado/certificación"
        value={data.degree}
        onChange={(e) => onChange({ ...data, degree: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Institución"
        value={data.institution}
        onChange={(e) => onChange({ ...data, institution: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
      />
     
      <textarea
        placeholder="Descripción (opcional)"
        value={data.description}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        rows="2"
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors flex items-center"
        >
          <Save size={14} className="mr-1" />
          {isNew ? 'Agregar' : 'Guardar'}
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm transition-colors flex items-center"
        >
          <X size={14} className="mr-1" />
          Cancelar
        </button>
      </div>
    </div>
  )

  // Componente para formulario de experiencia
  const ExperienceForm = ({ data, onChange, onSave, onCancel, isNew = false }) => (
    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600 space-y-3">
      <input
        type="text"
        placeholder="Posición/Cargo"
        value={data.position}
        onChange={(e) => onChange({ ...data, position: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Institución/Empresa"
        value={data.institution}
        onChange={(e) => onChange({ ...data, institution: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Período (ej: 2020-2023 o 2020-Presente)"
        value={data.period}
        onChange={(e) => onChange({ ...data, period: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={data.description}
        onChange={(e) => onChange({ ...data, description: e.target.value })}
        className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        rows="2"
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors flex items-center"
        >
          <Save size={14} className="mr-1" />
          {isNew ? 'Agregar' : 'Guardar'}
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm transition-colors flex items-center"
        >
          <X size={14} className="mr-1" />
          Cancelar
        </button>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {/* Header fijo */}
      <div className="flex justify-between items-center mb-6 sticky py-3 z-10 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-white">Información Académica</h2>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Finalizar edición" : "Editar información"}
        </button>
      </div>

      {/* Contenido scrolleable */}
      <div className="space-y-8 pb-8">
        {/* Formación académica */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-200">Formación académica</h3>
            {isEditing && (
              <button 
                onClick={() => setShowEducationForm(true)}
                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Añadir formación
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Formulario para nueva educación */}
            {showEducationForm && (
              <EducationForm
                data={newEducation}
                onChange={setNewEducation}
                onSave={handleAddEducation}
                onCancel={() => {
                  setShowEducationForm(false)
                  setNewEducation({ degree: '', institution: '', year: '', description: '' })
                }}
                isNew={true}
              />
            )}

            {academicInfo.education.map((item) => (
              <div key={item.id}>
                {editingEducation && editingEducation.id === item.id ? (
                  <EducationForm
                    data={editingEducation}
                    onChange={setEditingEducation}
                    onSave={handleSaveEducation}
                    onCancel={() => setEditingEducation(null)}
                  />
                ) : (
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 relative hover:border-slate-600 transition-colors">
                    {isEditing && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button 
                          onClick={() => handleEditEducation(item)}
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteEducation(item.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="font-medium text-white pr-16">{item.degree}</h4>
                      <span className="text-sm text-slate-400 md:ml-4">{item.year}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{item.institution}</p>
                    {item.description && <p className="text-slate-400 text-sm mt-2">{item.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Experiencia profesional */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-200">Experiencia profesional</h3>
            {isEditing && (
              <button 
                onClick={() => setShowExperienceForm(true)}
                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Añadir experiencia
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Formulario para nueva experiencia */}
            {showExperienceForm && (
              <ExperienceForm
                data={newExperience}
                onChange={setNewExperience}
                onSave={handleAddExperience}
                onCancel={() => {
                  setShowExperienceForm(false)
                  setNewExperience({ position: '', institution: '', period: '', description: '' })
                }}
                isNew={true}
              />
            )}

            {academicInfo.experience.map((item) => (
              <div key={item.id}>
                {editingExperience && editingExperience.id === item.id ? (
                  <ExperienceForm
                    data={editingExperience}
                    onChange={setEditingExperience}
                    onSave={handleSaveExperience}
                    onCancel={() => setEditingExperience(null)}
                  />
                ) : (
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 relative hover:border-slate-600 transition-colors">
                    {isEditing && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button 
                          onClick={() => handleEditExperience(item)}
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteExperience(item.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="font-medium text-white pr-16">{item.position}</h4>
                      <span className="text-sm text-slate-400 md:ml-4">{item.period}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{item.institution}</p>
                    {item.description && <p className="text-slate-400 text-sm mt-2">{item.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  )
}