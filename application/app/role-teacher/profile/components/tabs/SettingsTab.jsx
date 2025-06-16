"use client"

import { useState } from "react"
import { Bell, Lock, Eye, EyeOff, Check, X } from 'lucide-react'

export default function SettingsTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Estados para los campos de contraseña
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  
  // Estados para notificaciones
  const [notifications, setNotifications] = useState({
    studentMessages: true,
    assignments: true,
    systemAnnouncements: false,
    email: true
  })

  const handlePasswordChange = () => {
    setPasswordError("")
    setPasswordSuccess("")
    
    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Todos los campos son obligatorios")
      return
    }
    
    if (newPassword.length < 6) {
      setPasswordError("La nueva contraseña debe tener al menos 6 caracteres")
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden")
      return
    }
    
    // Simular actualización exitosa
    setTimeout(() => {
      setPasswordSuccess("Contraseña actualizada correctamente")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setPasswordSuccess(""), 3000)
    }, 500)
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-full px-4 sm:px-6">
        <div className="sticky top-0 py-4 mb-6 z-10 border-b border-slate-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-white">Configuración</h2>
            </div>
          </div>
        </div>

        {/* Cambiar contraseña */}
        <div className="mb-8 w-full">
          <div className="flex items-center mb-6">
            <Lock className="mr-3 text-gray-400 flex-shrink-0" size={20} />
            <h3 className="text-lg font-medium text-gray-200">Seguridad</h3>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6 w-full">
            <h4 className="text-white font-medium mb-6">Cambiar contraseña</h4>

            {passwordError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-start">
                <X className="mr-2 text-red-400 flex-shrink-0 mt-0.5" size={16} />
                <span className="text-red-400 text-sm break-words">{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-700 rounded-lg flex items-start">
                <Check className="mr-2 text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <span className="text-green-400 text-sm break-words">{passwordSuccess}</span>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6 w-full">
              <div className="w-full">
                <label className="block text-sm text-gray-300 mb-2">Contraseña actual</label>
                <div className="relative w-full">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-sm sm:text-base"
                    placeholder="Ingresa tu contraseña actual"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-300 mb-2">Nueva contraseña</label>
                <div className="relative w-full">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-sm sm:text-base"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-300 mb-2">Confirmar nueva contraseña</label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-sm sm:text-base"
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="w-full">
                <button 
                  onClick={handlePasswordChange}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Actualizar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  )
}