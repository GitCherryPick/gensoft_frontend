"use client";

import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import {
  getAllTasksLabs,
  sendCodeSolution,
} from "@/lib/sandbox/sandbox-service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProjectsPage() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [estadoEnvio, setEstadoEnvio] = useState(null);

  const userId = "your-user-id"; // Reemplazar por ID real si es necesario

  useEffect(() => {
    async function obtenerTareas() {
      try {
        setCargando(true);
        const response = await getAllTasksLabs();
        setTareas(response.tasks || response || []);
        setCargando(false);
      } catch (err) {
        console.error("Error al obtener tareas:", err);
        setError("Error al cargar las tareas. Intenta más tarde.");
        setCargando(false);
      }
    }
    obtenerTareas();
  }, []);

  const enviarCodigo = async () => {
    if (!tareaSeleccionada || !codigo.trim()) {
      setEstadoEnvio("Por favor, ingresa un código para enviar.");
      return;
    }

    try {
      setEstadoEnvio("Enviando...");
      const datos = {
        taskId: tareaSeleccionada.id,
        code: codigo,
        userId,
      };
      await sendCodeSolution(datos);
      setEstadoEnvio("¡Código enviado correctamente!");
      setCodigo("");
      setTimeout(() => setModalAbierto(false), 2000);
    } catch (err) {
      console.error("Error al enviar código:", err);
      setEstadoEnvio("Error al enviar el código. Intenta nuevamente.");
    }
  };

  if (cargando) {
    return <div className="text-center text-gray-300">Cargando tareas...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
     

      {tareas.length === 0 ? (
        <p className="text-center text-gray-400">No hay tareas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tareas.map((tarea) => (
            <div
              key={tarea.id}
              className="border border-gray-700 bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-800 text-purple-300 flex items-center justify-center">
                  <Code size={20} />
                </div>
                <h4 className="ml-3 text-lg font-semibold">{tarea.title}</h4>
              </div>
              <p className="text-sm text-gray-300">{tarea.description}</p>
              <div className="mt-4 text-right">
                <Button
                  onClick={() => {
                    setTareaSeleccionada(tarea);
                    setModalAbierto(true);
                  }}
                  className="bg-purple-500 hover:bg-neutral-700  text-white font-medium transition-colors"
                >
                  Ver Código
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Enviar código para: {tareaSeleccionada?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Textarea
              className="w-full h-48 bg-gray-800 text-gray-100 border border-gray-600 p-3 rounded-md"
              placeholder="Pega tu código aquí..."
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            {estadoEnvio && (
              <p
                className={`mt-2 text-sm ${
                  estadoEnvio.includes("¡Código enviado")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {estadoEnvio}
              </p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setModalAbierto(false)}
              className="text-gray-200 border-gray-600 hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={enviarCodigo}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
