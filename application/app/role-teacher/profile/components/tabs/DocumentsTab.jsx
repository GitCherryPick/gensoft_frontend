"use client"

import { useState } from "react"
import { FileText, Download, Upload, Trash2, Eye, Plus, FolderOpen, Search, Filter, Calendar, File, Archive, Award, BookOpen, Users, Edit2, X, Check, AlertCircle } from 'lucide-react'

export default function DocumentsTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [notification, setNotification] = useState(null)


  const [uploadForm, setUploadForm] = useState({
    name: "",
    category: "Personal",
    description: "",
    file: null
  })


  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Curriculum Vitae",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "15/01/2023",
      category: "Personal",
      description: "CV actualizado con experiencia profesional",
      icon: <File className="w-4 h-4" />,
      url: "#"
    },
    {
      id: 2,
      name: "Título Doctorado",
      type: "PDF",
      size: "3.5 MB",
      uploadDate: "10/02/2023",
      category: "Académico",
      description: "Título oficial de Doctorado en Ciencias de la Educación",
      icon: <Award className="w-4 h-4" />,
      url: "#"
    },

  ])
  const [categories, setCategories] = useState([
    { id: "all", name: "Todos", color: "bg-blue-500", icon: <Archive className="w-4 h-4" />, editable: false },
    { id: "Personal", name: "Personal", color: "bg-green-500", icon: <File className="w-4 h-4" />, editable: true },
    { id: "Académico", name: "Académico", color: "bg-purple-500", icon: <Award className="w-4 h-4" />, editable: true },
    { id: "Certificación", name: "Certificación", color: "bg-yellow-500", icon: <Award className="w-4 h-4" />, editable: true },
    { id: "Investigación", name: "Investigación", color: "bg-red-500", icon: <BookOpen className="w-4 h-4" />, editable: true },
    { id: "Docencia", name: "Docencia", color: "bg-indigo-500", icon: <Users className="w-4 h-4" />, editable: true }
  ])


  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

 
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return documents.length
    return documents.filter(doc => doc.category === categoryId).length
  }

  
  const getFilteredAndSortedDocuments = () => {
    let filtered = documents.filter(doc => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })


    return filtered
  }

  
  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id))
    showNotification("Documento eliminado correctamente")
  }


  const downloadDocument = (doc) => {
    showNotification(`Descargando ${doc.name}...`)
  }


  const viewDocument = (doc) => {
    showNotification(`Abriendo ${doc.name}...`)
  }


  const handleUploadSubmit = () => {
    if (!uploadForm.name || !uploadForm.file) {
      showNotification("Faltan campos requeridos", "error")
      return
    }

    const newDoc = {
      id: Math.max(...documents.map(d => d.id)) + 1,
      name: uploadForm.name,
      type: uploadForm.file.name.split('.').pop().toUpperCase(),
      size: `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toLocaleDateString('es-ES'),
      category: uploadForm.category,
      description: uploadForm.description,
      icon: <File className="w-4 h-4" />,
      url: "#"
    }

    setDocuments([...documents, newDoc])
    setUploadForm({ name: "", category: "Personal", description: "", file: null })
    setShowUploadModal(false)
    showNotification("Documento subido correctamente")
  }

  const addCategory = () => {
    if (!newCategoryName.trim()) return

    const colors = ["bg-orange-500", "bg-pink-500", "bg-teal-500", "bg-cyan-500", "bg-lime-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newCategory = {
      id: newCategoryName.replace(/\s+/g, ''),
      name: newCategoryName.trim(),
      color: randomColor,
      icon: <FolderOpen className="w-4 h-4" />,
      editable: true
    }

    setCategories([...categories, newCategory])
    setNewCategoryName("")
    setShowCategoryModal(false)
    showNotification("Categoría creada correctamente")
  }


  const deleteCategory = (categoryId) => {
    const hasDocuments = documents.some(doc => doc.category === categoryId)
    if (hasDocuments) {
      showNotification("No se puede eliminar una categoría que contiene documentos", "error")
      return
    }

    setCategories(categories.filter(cat => cat.id !== categoryId))
    showNotification("Categoría eliminada correctamente")
  }

  const updateCategory = (categoryId, newName) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, name: newName } : cat
    ))
    setEditingCategory(null)
    showNotification("Categoría actualizada correctamente")
  }

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800 border-red-200'
      case 'DOCX': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'XLSX': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredDocuments = getFilteredAndSortedDocuments()

  return (
    <div className="w-full">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white flex items-center space-x-2`}>
          <AlertCircle className="w-4 h-4" />
          <span>{notification.message}</span>
        </div>
      )}

      <div className="sticky top-0  from-slate-800 to-slate-800 py-4 px-6 -mx-6 mb-6 z-10 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FolderOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Documentos</h2>
              <p className="text-sm text-slate-400">{documents.length} documentos en total</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors duration-200"
            >
              <Upload size={16} className="mr-2" />
              Subir documento
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Finalizar gestión" : "Gestionar"}
            </button>
          </div>
        </div>
      </div>

 
      <div className="mb-6 space-y-4">
        {/* Barra de búsqueda con filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          
        </div>

        {/* Categorías como filtros */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className={`p-1 rounded ${category.color}/20`}>
                {category.icon}
              </span>
              <span>{category.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === category.id ? 'bg-white/20' : 'bg-slate-700'
              }`}>
                {getCategoryCount(category.id)}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Lista de documentos */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No se encontraron documentos</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icono del documento */}
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    {doc.icon}
                  </div>
                  
                  {/* Información principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">{doc.name}</h3>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getFileTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-3">{doc.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="flex items-center">
                        <Archive className="w-3 h-3 mr-1" />
                        {doc.size}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {doc.uploadDate}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        categories.find(cat => cat.id === doc.category)?.color || 'bg-gray-500'
                      }/20 text-white`}>
                        {doc.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Acciones */}
                <div className="flex items-center space-x-2 ml-4">
                  {isEditing ? (
                    <button 
                      onClick={() => deleteDocument(doc.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => viewDocument(doc)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => downloadDocument(doc)}
                        className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200"
                      >
                        <Download size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección de gestión de categorías */}
      {isEditing && (
        <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Gestionar Categorías</h3>
            <button 
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Añadir categoría
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.slice(1).map((category) => (
              <div
                key={category.id}
                className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 flex justify-between items-center hover:bg-slate-700/70 transition-colors"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <span className={`p-1 rounded ${category.color}/20`}>
                    {category.icon}
                  </span>
                  {editingCategory === category.id ? (
                    <input
                      type="text"
                      defaultValue={category.name}
                      className="bg-slate-600 text-white text-sm px-2 py-1 rounded border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateCategory(category.id, e.target.value)
                        } else if (e.key === 'Escape') {
                          setEditingCategory(null)
                        }
                      }}
                      onBlur={(e) => updateCategory(category.id, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className="text-white text-sm">{category.name}</span>
                  )}
                  <span className="px-2 py-0.5 bg-slate-600 rounded-full text-xs text-slate-300">
                    {getCategoryCount(category.id)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {editingCategory === category.id ? (
                    <button 
                      onClick={() => setEditingCategory(null)}
                      className="text-slate-400 hover:text-green-400 transition-colors"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setEditingCategory(category.id)}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  {category.editable && (
                    <button 
                      onClick={() => deleteCategory(category.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de subida de documento */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Subir Documento</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre del documento</label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Categoría</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Archivo</label>
                <input
                  type="file"
                  onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUploadSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Subir documento
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de nueva categoría */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Nueva Categoría</h3>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre de la categoría</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Contratos"
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={addCategory}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Crear categoría
                </button>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-20"></div>
    </div>
  )
}