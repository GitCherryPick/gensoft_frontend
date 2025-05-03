'use client';

import dynamic from 'next/dynamic';
import React, { useState } from "react";

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });


export default function CoursesPage() {
  const [codigo, setCodigo] = useState("// Escribe tu código aquí...");
  const [salida, setSalida] = useState("");
  const [archivoGuardado, setArchivoGuardado] = useState("");


  const ejecutarCodigo = () => {
    try {
      // Evalúa código JS
      const resultado = eval(codigo);
      setSalida(String(resultado));
    } catch (error) {
      setSalida("⚠️ Error: " + error.message);
    }
  };

  const guardarArchivo = () => {
    const blob = new Blob([codigo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codigo.js";
    a.click();
    URL.revokeObjectURL(url);
    setArchivoGuardado("Archivo guardado como codigo.js");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-4">
      <div className="text-4xl font-bold">Cursos</div>

      {/* Botones */}
      <div className="space-x-4">
        <button
          onClick={guardarArchivo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
        <button
          onClick={ejecutarCodigo}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ejecutar
        </button>
      </div>

      {/* Editor */}
      <div className="w-full max-w-6xl h-[500px] border border-gray-600 rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/2 h-full">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={codigo}
            theme="vs-dark"
            onChange={(valor) => {
              if (valor !== undefined) setCodigo(valor);
            }}            
          />
        </div>

        {/* Panel de Salida + Área vacía */}
        <div className="w-1/2 h-full grid grid-rows-2">
          <div className="bg-black text-white p-4 overflow-auto text-sm rounded-t">
            <strong>Salida:</strong>
            <pre>{salida}</pre>
            {archivoGuardado && (
              <div className="text-green-400 mt-2">{archivoGuardado}</div>
            )}
          </div>
          <div className="bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-700">
            PREGUNTAR
          </div>
        </div>
      </div>
    </div>
  );
}
