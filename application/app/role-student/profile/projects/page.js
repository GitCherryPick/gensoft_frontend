"use client";
import { Code } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Calculadora Simple",
    description: "Calculadora con operaciones básicas",
  },
  {
    id: 2,
    name: "Juego de Adivinanza",
    description: "Juego para adivinar un número aleatorio",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-700 bg-gray-800 rounded-lg p-4"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-900 text-purple-400 flex items-center justify-center">
                <Code size={20} />
              </div>
              <h4 className="ml-3 font-medium text-gray-200">{project.name}</h4>
            </div>
            <p className="mt-3 text-sm text-gray-400">{project.description}</p>
            <div className="mt-4 flex justify-end">
              <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                Ver código
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
