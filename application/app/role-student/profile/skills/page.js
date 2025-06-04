"use client";
import { useState, useEffect } from "react";
import { Code, Brain, FileText, Repeat, Layers, Zap } from "lucide-react";

const skills = [
  { id: 1, name: "Python", icon: Code, progress: 90 },
  { id: 2, name: "Logica de programacion", icon: Brain, progress: 5 },
  { id: 3, name: "Sintaxis de python", icon: FileText, progress: 0 },
  { id: 4, name: "Estructuras de control", icon: Repeat, progress: 0 },
  { id: 5, name: "Estructuras de datos basicas", icon: Layers, progress: 0 },
  { id: 6, name: "Funciones", icon: Zap, progress: 0 },
  { id: 7, name: "Estructuras de control", icon: Repeat, progress: 0 },
];

export default function SkillsDashboard() {
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    // Calcular el promedio de progreso
    const total = skills.reduce((sum, skill) => sum + skill.progress, 0);
    const average = (total / (skills.length * 100)) * 100;
    setTotalProgress(parseFloat(average.toFixed(1)));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
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

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-6">
          Progreso Total
        </h3>
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>

          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="8"
              strokeDasharray={`${totalProgress * 2.51} 251`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold text-white">
                {totalProgress}%
              </span>
              <p className="text-xs text-gray-400 mt-1">Completado</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Habilidades totales:</span>
            <span className="text-white font-medium">{skills.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Habilidades iniciadas:</span>
            <span className="text-white font-medium">
              {skills.filter((s) => s.progress > 0).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
