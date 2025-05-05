'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function EditorPython() {
  const [isCliente, setIsCliente] = useState(false);
  const [codigo, setCodigo] = useState("# Escribe tu código en Python aquí...");
  const [salida, setSalida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [archivoGuardado, setArchivoGuardado] = useState("");
  const [pyodide, setPyodide] = useState(null);

  useEffect(() => {
    setIsCliente(true);

    const cargarPyodide = async () => {
      if (!window.loadPyodide) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.onload = async () => {
          const pyodide = await window.loadPyodide();
          setPyodide(pyodide);
        };
        document.body.appendChild(script);
      } else {
        const pyodide = await window.loadPyodide();
        setPyodide(pyodide);
      }
    };

    cargarPyodide();
  }, []);

  if (!isCliente) return null; 

  const ejecutarCodigo = async () => {
    if (!pyodide) {
      setSalida("⚠️ Pyodide aún se está cargando...");
      return;
    }
  
    try {
      const entradaProcesada = entrada
        .split('\n')
        .map(linea => `"${linea.replace(/"/g, '\\"')}"`)
        .join(', ');
  
        const codigoEjecutable = `
import sys
import io

sys.stdout = io.StringIO()

_entradas = iter([${entradaProcesada}])
input = lambda: next(_entradas)

try:
    exec("""${codigo}""")
except Exception as e:
    print("⚠️ Error en tiempo de ejecución:", e)

output = sys.stdout.getvalue()
`;

      await pyodide.runPythonAsync(codigoEjecutable);
      const resultado = await pyodide.runPythonAsync("output");
      setSalida(resultado || "✅ Código ejecutado correctamente.");
    } catch (error) {
      setSalida("⚠️ Error al ejecutar el código: " + error.message);
    }
  };
  
  const guardarArchivo = () => {
    const blob = new Blob([codigo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codigo.py";
    a.click();
    URL.revokeObjectURL(url);
    setArchivoGuardado("Archivo guardado como codigo.py");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-4">

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

      {/* Editor y consola */}
      <div className="w-full max-w-6xl h-[500px] border border-gray-600 rounded-lg shadow-lg overflow-hidden flex">
        {/* Editor */}
        <div className="w-1/2 h-full">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={codigo}
            theme="vs-dark"
            onChange={(valor) => {
              if (valor !== undefined) setCodigo(valor);
            }}
          />
        </div>

        {/* Consola */}
        <div className="w-1/2 h-full grid grid-rows-[1fr_auto] bg-black text-white">
          <div className="p-4 overflow-auto text-sm border-b border-gray-700">
            <strong>Salida:</strong>
            <pre>{salida}</pre>
            {archivoGuardado && (
              <div className="text-green-400 mt-2">{archivoGuardado}</div>
            )}
          </div>
          <div className="p-4 bg-gray-900 border-t border-gray-700">
            <label htmlFor="entrada" className="block font-bold mb-1">Entrada:</label>
            <textarea
              id="entrada"
              className="w-full h-20 p-2 bg-gray-800 border border-gray-600 rounded text-white"
              placeholder="Escribe aquí tus valores de entrada..."
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
