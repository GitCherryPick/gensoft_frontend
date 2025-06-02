"use client"

import { useState } from "react"
import { Bell, Lock, Eye, EyeOff } from 'lucide-react'

export default function SettingsTab() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-light-1 mb-6">Configuración</h2>
      </div>

      {/* Cambiar contraseña */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Lock className="mr-2 text-light-3" size={18} />
          <h3 className="text-md font-medium text-light-2">Seguridad</h3>
        </div>

        <div className="bg-dark-1 rounded-lg border border-dark-3 p-6">
          <h4 className="text-light-1 font-medium mb-4">Cambiar contraseña</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-light-3 mb-1">Contraseña actual</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 bg-dark-2 border border-dark-3 rounded-md text-light-1 focus:outline-none focus:ring-1 focus:ring-cta-1 pr-10"
                  placeholder="••••••••••••"
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-light-3 mb-1">Nueva contraseña</label>
              <input
                type="password"
                className="w-full p-2 bg-dark-2 border border-dark-3 rounded-md text-light-1 focus:outline-none focus:ring-1 focus:ring-cta-1"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-sm text-light-3 mb-1">Confirmar nueva contraseña</label>
              <input
                type="password"
                className="w-full p-2 bg-dark-2 border border-dark-3 rounded-md text-light-1 focus:outline-none focus:ring-1 focus:ring-cta-1"
                placeholder="••••••••••••"
              />
            </div>

            <button className="px-4 py-2 bg-cta-1 text-black rounded-md text-sm font-medium mt-2">
              Actualizar contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div>
        <div className="flex items-center mb-4">
          <Bell className="mr-2 text-light-3" size={18} />
          <h3 className="text-md font-medium text-light-2">Notificaciones</h3>
        </div>

        <div className="bg-dark-1 rounded-lg border border-dark-3 p-6">
          <h4 className="text-light-1 font-medium mb-4">Preferencias de notificación</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-1">Mensajes de estudiantes</p>
                <p className="text-sm text-light-3">Recibir notificaciones cuando los estudiantes envíen mensajes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-dark-3 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cta-1"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-1">Entregas de tareas</p>
                <p className="text-sm text-light-3">Recibir notificaciones cuando los estudiantes entreguen tareas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-dark-3 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cta-1"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-1">Anuncios del sistema</p>
                <p className="text-sm text-light-3">Recibir notificaciones sobre actualizaciones del sistema</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-dark-3 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cta-1"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-1">Correo electrónico</p>
                <p className="text-sm text-light-3">Recibir notificaciones por correo electrónico</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-dark-3 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cta-1"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}