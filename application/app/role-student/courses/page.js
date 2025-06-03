'use client';
import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import TestCaseResult from '../../../components/TestCaseResult'
import { SANDBOX_API_BASE_URL, defaultContentHeaders } from '../../../lib/sandbox/sandbox-api-config';
import Sandbox from "./labs/Sandbox";
import { LabDashboardModal } from "../../../components/DashBoardMetrics.jsx";

export default function EditorPython() {
  const [isCliente, setIsCliente] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [salida, setSalida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [score, setScore] = useState(0);
  const [pestanaActiva, setPestanaActiva] = useState('enunciado');
  const [nuumberCases, setNumberCases] = useState("--");
  
 const [labStats, setLabStats] = useState(null);

  const [codigo, setCodigo] = useState("# Escribe tu código en Python aquí...");

  const sandboxRef = useRef();
  const [taskTitle, setTaskTitle] = useState("Cargando...");
  const [taskEnunciado, setTaskEnunciado] = useState("Cargando...");


  const fetchScore = async () => {
    try {
      const response = await fetch(`${SANDBOX_API_BASE_URL}/tasks/getScore?task_id=${1}&user_id=${1}`, {
        method: "GET"
      });
      const data = await response.json();
      console.log("response ", data);
      if(data.score > score){
        setScore(data.score);
      }
      setNumberCases(data.score);
    } catch(error) {

    }
  }

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
    fetchScore();
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
          UserId: 1,
          code: codigo,
          taskId: 1,
        }),
      });

      setPestanaActiva("testcases")

      const data = await res.json();
      console.log("Respuesta del servidor:", data);
      setSalida(data.output || "Código enviado correctamente.");
      setTestCases(data.testCases || []);
      fetchScore();
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

      <div className="w-full max-w-8xl flex justify-star px-4 mt-10">
        <LabDashboardModal labStats={labStats} />
      </div>
      <div className="relative w-full flex items-center justify-center px-4 m-4">
        {/* Botones centrados al medio */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button onClick={guardarArchivo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
          <button onClick={ejecutarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Ejecutar</button>
          <button onClick={enviarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enviar</button>
        </div>

        {/* Puntaje a la derecha */}
        <div className="absolute right-[5%] w-[180px] bg-gray-100 px-4 py-2 rounded border border-gray-300 shadow">
          <div className="flex justify-center items-center"> {/* Contenedor flex centrado */}
            <span className="text-gray-700 font-medium">Puntaje: </span>
            <span className="font-bold text-green-700"> {score} / {nuumberCases}</span>
          </div>
        </div>
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
          taskEnunciado={taskEnunciado}
        />
      </div>
    </div>
  );
}
