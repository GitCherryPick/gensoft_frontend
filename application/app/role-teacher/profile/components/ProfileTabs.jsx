"use client"

import { BookOpen, FileText, Award, Info } from 'lucide-react'

export default function ProfileTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "informacion", label: "Información", icon: <Info className="w-4 h-4" /> },
    { id: "cursos", label: "Cursos de Python", icon: <BookOpen className="w-4 h-4" /> },
    { id: "proyectos", label: "Proyectos", icon: <FileText className="w-4 h-4" /> },
  ]

  return (
    <div className="bg-[#0e101e] rounded-lg mb-4">
      <div className="flex justify-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center gap-1 py-2 px-4 min-w-[120px] text-center transition-colors text-sm ${
              activeTab === tab.id ? "text-white border-b-2 border-[#7c5cfc]" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}