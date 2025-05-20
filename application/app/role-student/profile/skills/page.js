"use client";

import { Code, Brain, FileText, Repeat, Layers, Zap } from "lucide-react";

const skills = [
  { id: 1, name: "Python", icon: Code, progress: 10 },
  { id: 2, name: "Logica de programacion", icon: Brain, progress: 5 },
  { id: 3, name: "Sintaxis de python", icon: FileText, progress: 0 },
  { id: 4, name: "Estructuras de control", icon: Repeat, progress: 0 },
  { id: 5, name: "Estructuras de datos basicas", icon: Layers, progress: 0 },
  { id: 6, name: "Funciones", icon: Zap, progress: 0 },
  { id: 7, name: "Estructuras de control", icon: Repeat, progress: 0 },
];

export default function SkillsPage() {
  return (
    <div className="space-y-4 pt-0">
      {skills.map(({ id, name, icon: Icon, progress }) => (
        <div
          key={id}
          className="space-y-3 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-base font-medium text-gray-300 flex items-center gap-2">
              <Icon size={18} className="text-indigo-400" />
              {name}
            </span>
            <span className="text-indigo-300 font-semibold">{progress}%</span>
          </div>
          <div className="relative w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
