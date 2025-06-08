"use client";
import React from "react";
import { Settings, Clock, GraduationCap, Sparkles } from "lucide-react";

const ExamSettings = ({ exam, setExam }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl text-white">
            <Settings size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Configuración del Examen
          </h2>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                <Clock size={16} className="text-blue-400" />
                <span>Tiempo límite (minutos)</span>
              </label>
              <input
                type="number"
                value={exam.timeLimit}
                onChange={(e) =>
                  setExam((prev) => ({
                    ...prev,
                    timeLimit: parseInt(e.target.value) || 60,
                  }))
                }
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                <GraduationCap size={16} className="text-green-400" />
                <span>Puntuación mínima (%)</span>
              </label>
              <input
                type="number"
                value={exam.settings.passingScore}
                onChange={(e) =>
                  setExam((prev) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      passingScore: parseInt(e.target.value) || 70,
                    },
                  }))
                }
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <span>Opciones avanzadas</span>
            </h3>

            <div className="space-y-4">
              {[
                {
                  key: "randomizeQuestions",
                  label: "Aleatorizar orden de preguntas",
                  description:
                    "Las preguntas aparecerán en orden aleatorio para cada estudiante",
                  color: "purple",
                },
                {
                  key: "showResults",
                  label: "Mostrar resultados al finalizar",
                  description:
                    "Los estudiantes verán su puntuación inmediatamente",
                  color: "blue",
                },
              ].map((setting) => (
                <label
                  key={setting.key}
                  className="flex items-start space-x-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={exam.settings[setting.key]}
                    onChange={(e) =>
                      setExam((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          [setting.key]: e.target.checked,
                        },
                      }))
                    }
                    className={`w-5 h-5 text-${setting.color}-500 bg-gray-700 border-gray-600 focus:ring-${setting.color}-500 focus:ring-2 rounded mt-0.5`}
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium group-hover:text-gray-200 transition-colors">
                      {setting.label}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {setting.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSettings;
