'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import OneDarkPro from '../../../public/theme/onedarkpro.json';
import confetti from "canvas-confetti";
import TestCaseResult from '../../../components/TestCaseResult'
import { SANDBOX_API_BASE_URL, defaultContentHeaders } from '../../../lib/sandbox/sandbox-api-config';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function EditorPython() {
  const [isCliente, setIsCliente] = useState(false);
  const [codigo, setCodigo] = useState("# Escribe tu código en Python aquí...");
  const [salida, setSalida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [archivoGuardado, setArchivoGuardado] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [testCases, setTestCases] = useState([]);

  const [pestanaActiva, setPestanaActiva] = useState('enunciado');

  // 👇 Nuevos estados para el título y enunciado
  const [taskTitle, setTaskTitle] = useState("Cargando...");
  const [taskEnunciado, setTaskEnunciado] = useState("Cargando...");

  const handleEditorDidMount = (monaco) => {
    monaco.editor.defineTheme('OneDarkPro', {
      base: 'vs-dark',
      inherit: true,
      ...OneDarkPro
    });
  };

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

    const fetchTask = async () => {
      try {
        const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks/1`);
        const data = await response.json();
        setTaskTitle(data.title);
        setTaskEnunciado(data.enunciado);
      } catch (error) {
        setTaskTitle("Error al cargar");
        setTaskEnunciado("No se pudo obtener el enunciado. Verifica que el servidor esté corriendo.");
      }
    };

    cargarPyodide();
    fetchTask();
  }, []);

  if (!isCliente) return null;

  const ejecutarCodigo = async () => {
    await fetch(`${SANDBOX_API_BASE_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: codigo,
        call: entrada,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSalida(data.output || data.error);
      })
      .catch((error) => {
        setSalida("Error al ejecutar el código: " + error.message);
      });
  };

  const enviarCodigo = async () => {
    try {
      const res = await fetch("http://localhost:8010/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          code: codigo,
          taskId: 1,
        }),
      });

      console.log("code  ", codigo)

      setPestanaActiva("testcases")
      
      const data = await res.json();
      console.log("Respuesta del servidor:", data);
      setSalida(data.output || "Código enviado correctamente.");
      setTestCases(data.testCases || []);
  
      if (data.generalVeredict === "Accepted") {
        const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1000,
  };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 100 * (timeLeft / duration);

    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: Math.random() * 0.2, y: Math.random() * 0.3 },
      colors: ['#00ffcc', '#33cc33', '#99ff66', '#ffffff'],
    }));

    confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: 1 - Math.random() * 0.2, y: Math.random() * 0.3 },
        colors: ['#00ffcc', '#33cc33', '#99ff66', '#ffffff'],
      }));
    }, 200);
        
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setSalida("Error al enviar: " + error.message);
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
      <div className="space-x-4">
        <button onClick={guardarArchivo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
        <button onClick={ejecutarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ejecutar</button>
        <button onClick={enviarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enviar</button>
      </div>

      <div className="w-full max-w-8xl h-[600px] grid grid-cols-3 gap-x-4">
        <div className="h-full bg-white text-black rounded-lg shadow p-4 overflow-auto bg-[#17181c] border border-[#52585a]">
          <div className="flex border-b mb-4">
            <button
              onClick={() => setPestanaActiva('enunciado')}
              className={`mr-4 pb-2 ${pestanaActiva === 'enunciado' ? 'border-b-2 border-blue-600 font-semibold text-white' : 'text-gray-600'}`}
            >
              Enunciado
            </button>
            <button
              onClick={() => setPestanaActiva('testcases')}
              className={`pb-2 ${pestanaActiva === 'testcases' ? ' text-white border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}
            >
              Test Cases
            </button>
          </div>

          {pestanaActiva === 'enunciado' && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">{taskTitle}</h2>
              <p className="text-white">{taskEnunciado}</p>
            </div>
          )}

          {pestanaActiva === 'testcases' && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">Casos de prueba</h2>
              {testCases.length === 0 && <p>Realiza un envio.</p>}
              {testCases.map((tc, i) => (
                <TestCaseResult
                  key={i}
                  testNumber={i}
                  input={tc.input}
                  expectedOutput={tc.expectedOutput}
                  output={tc.output}
                  veredict={tc.veredict}
                />
              ))}
            </div>
          )}
        </div>

        <div className="h-full col-span-2 grid grid-cols-[6fr_3fr] gap-0">
          <div className="h-full bg-gray-900 rounded-l-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={codigo}
              theme="OneDarkPro"
              beforeMount={handleEditorDidMount}
              onChange={(valor) => {
                if (valor !== undefined) setCodigo(valor);
              }}
            />
          </div>

          <div className="h-full grid grid-rows-[1fr_auto] bg-black text-white rounded-r-lg overflow-hidden">
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
                className="w-full h-20 p-2 border border-gray-600 bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-cta-1 focus:border-cta-1 resize-none text-white"
                placeholder="Escribe aquí tus valores de entrada..."
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
