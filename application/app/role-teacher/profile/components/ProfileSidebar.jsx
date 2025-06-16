"use client"

import { User, BookOpen, Award, Settings, Clock, FileText } from 'lucide-react'

export default function ProfileSidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "personal", label: "Información personal", icon: User },
    { id: "academic", label: "Información académica", icon: BookOpen },
   
    { id: "schedule", label: "Horario", icon: Clock },
    { id: "documents", label: "Documentos", icon: FileText },
    { id: "settings", label: "Configuración", icon: Settings },
  ]

  return (
    <div className="bg-dark-2 rounded-xl border border-dark-3 overflow-hidden">
      <div className="p-4 border-b border-dark-3">
        <h2 className="text-lg font-medium text-light-1">Perfil</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <li key={tab.id}>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    activeTab === tab.id ? "bg-cta-selected text-light-1" : "text-light-2 hover:bg-cta-hover"
                  }`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}