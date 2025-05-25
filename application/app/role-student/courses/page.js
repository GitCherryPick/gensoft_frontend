'use client';
import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import TestCaseResult from '../../../components/TestCaseResult'
import { SANDBOX_API_BASE_URL, defaultContentHeaders } from '../../../lib/sandbox/sandbox-api-config';
import Sandbox from "./labs/Sandbox";

export default function EditorPython() {
  const [isCliente, setIsCliente] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [salida, setSalida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [codigo, setCodigo] = useState("# Escribe tu código en Python aquí...");

  const sandboxRef = useRef();
  const [pestanaActiva, setPestanaActiva] = useState('enunciado');

  const [taskTitle, setTaskTitle] = useState("Cargando...");
  const [taskEnunciado, setTaskEnunciado] = useState("Cargando...");


  useEffect(() => {
    setIsCliente(true);
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
    fetchTask();
  }, []);

  if (!isCliente) return null;

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
    if(sandboxRef.current) {
      sandboxRef.current.saveFile();
    }
  }

  const ejecutarCodigo = () => {
    if(sandboxRef.current) {
      sandboxRef.current.executeCode();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 space-y-4 overflow-auto">
      <div className="space-x-4">
        <button onClick={guardarArchivo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
        <button onClick={ejecutarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ejecutar</button>
        <button onClick={enviarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enviar</button>
      </div>

      <div className="w-full max-w-8xl h-[600px] grid grid-cols-3 gap-x-4">
        <div className="h-full text-black rounded-lg shadow p-4 overflow-auto bg-[#17181c] border border-[#52585a]">
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
        <Sandbox 
          codigo={codigo} 
          setCodigo={setCodigo} 
          ref={sandboxRef} 
          salida={salida}
          setSalida={setSalida}
          entrada={entrada}
          setEntrada={setEntrada}
        />
      </div>
    </div>
  );
}
