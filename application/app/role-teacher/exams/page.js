"use client";
import React, { useState } from "react";
import { Save, Settings } from "lucide-react";
import ExamSettings from "./ExamSettings";
import ExamEditor from "./ExamEditor";
import { questionTypes } from "./questionTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

const ExamCreator = () => {
  const [exam, setExam] = useState({
    title: "",
    description: "",
    timeLimit: 60,
    questions: [],
    settings: {
      randomizeQuestions: false,
      showResults: true,
      allowRetake: false,
      passingScore: 70,
    },
  });

  const [currentView, setCurrentView] = useState("editor");

  const renderSettings = () => {
    return <ExamSettings exam={exam} setExam={setExam} />;
  };

  const handleSave = () => {
    console.log("Examen guardado:", exam);
  };

  return (
    <div className="min-h-screen w-full bg-dark-1 relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                placeholder="Nombre del examen"
                value={exam.title}
                onChange={(e) =>
                  setExam((prev) => ({ ...prev, title: e.target.value }))
                }
                className="text-2xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Una descripción que inspire a tus estudiantes..."
                value={exam.description}
                onChange={(e) =>
                  setExam((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder-gray-600"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1">
                <button
                  onClick={() => setCurrentView("editor")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === "editor"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Editor
                </button>

                <button
                  onClick={() => setCurrentView("settings")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                    currentView === "settings"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <Settings size={16} />
                  <span>Configuración</span>
                </button>
              </div>

              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Save size={18} />
                <span className="font-medium">Guardar Examen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {currentView === "editor" && (
            <ExamEditor exam={exam} setExam={setExam} />
          )}
          {currentView === "settings" && renderSettings()}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ExamCreator;
