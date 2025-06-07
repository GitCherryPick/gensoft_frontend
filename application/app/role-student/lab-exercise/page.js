'use client';
import React, { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import TestCaseResult from '@/components/TestCaseResult'
import { SANDBOX_API_BASE_URL } from '@/lib/sandbox/sandbox-api-config';
import Sandbox from "./labs/Sandbox"
import { postFeedbackAI } from "@/lib/users/users-service";
import { Download, Play, SendHorizonal } from "lucide-react";
import { feedbackForEachTest, getScore, getTaskById, sendCodeSolution } from "@/lib/sandbox/sandbox-service";
import {TextRevealCard} from "@/components/ui/text-reveal-card";

export default function LabPython({taskId=1, userId=1}) {
  const taskIdNum = !isNaN(taskId) ? parseInt(taskId) : 1
  const [isCliente, setIsCliente] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [salida, setSalida] = useState("");
  const [entrada, setEntrada] = useState("");
  const [feedbackForDocente, setFeedbackForDocente] = useState([]);
  const [feedbackAIUser, setFeedbackAIUser] = useState([]);
  const [nIntentos, setNIntentos] = useState(0);
  const [score, setScore] = useState(0);
  const [pestanaActiva, setPestanaActiva] = useState('enunciado');
  const [nuumberCases, setNumberCases] = useState("--");
  
  const [codigo, setCodigo] = useState("# Escribe tu código en Python aquí...");

  const sandboxRef = useRef();
  const [taskTitle, setTaskTitle] = useState("Cargando...");
  const [taskEnunciado, setTaskEnunciado] = useState("Cargando...");


  const fetchScore = async () => {
    try {
      const data = await getScore(taskIdNum,4);
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
        const data = await getTaskById(taskIdNum);
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
      console.log("holatriste", taskIdNum)
      const feedback = await postFeedbackAI({
        student_id: 4,//id del user 
        task_id_lab: taskIdNum,
        feedback_ai: [feedbackForDocente] ?? ["No fue posible generar feedback automatico"],
        n_intentos: nIntentos
      });
      const data = await sendCodeSolution({
        userId: 4,
        code: codigo,
        taskId: taskIdNum,
        result: salida.includes(":")? salida : "",
        autofeedback_id: feedback.id?? 0
      });
      console.log("problemas?", data.testCases)
      let testSet = []
      if (Array.isArray(data.testCases)) {
        testSet = data.testCases.map(val => {
          return {
            input: val.input,
            expected_output: val.expectedOutput,
            real_output: val.output
          }
        })
        console.log("el testSEt ", testSet)
      }
      
      const selfFeedback = await feedbackForEachTest({
        codigo_estudiante: codigo,
        enunciado: taskEnunciado,
        test_set: testSet || []
      })
      console.log("te salio esto ", selfFeedback)
      setFeedbackAIUser(selfFeedback);
      setPestanaActiva("testcases")
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
    setNIntentos(nIntentos+1);
    if(sandboxRef.current) {
      sandboxRef.current.executeCode();
    }
  }

  return (
    <div className="flex flex-col items-center h-full w-auto space-y-4 overflow-x-hidden">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between m-2">
        {/* Botones centrados al medio */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto">
        <div className="flex flex-row sm:hidden space-x-4">
      <button onClick={guardarArchivo} className="bg-blue-600 p-2 rounded hover:bg-blue-700">
        <Download className="h-6 w-6 text-white" />
      </button>
      <button onClick={ejecutarCodigo} className="bg-green-600 p-2 rounded hover:bg-green-700">
        <Play className="h-6 w-6 text-white" />
      </button>
      <button onClick={enviarCodigo} className="bg-green-600 p-2 rounded hover:bg-green-700">
        <SendHorizonal className="h-6 w-6 text-white" />
      </button>
    </div>
    <div className="hidden sm:flex flex-row space-x-4">
      <button onClick={guardarArchivo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
        <Download className="h-5 w-5 mr-2" /> Guardar
      </button>
      <button onClick={ejecutarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
        <Play className="h-5 w-5 mr-2" /> Ejecutar
      </button>
      <button onClick={enviarCodigo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
        <SendHorizonal className="h-5 w-5 mr-2" /> Enviar
      </button>
    </div>
        </div>

        {/* Puntaje a la derecha */}
        <div className="w-full sm:w-[180px] bg-gray-100 px-4 py-2 rounded border border-gray-300 shadow flex justify-center  mt-2 sm:mt-0">
          <div className="flex justify-center items-center">
            <span className="text-gray-700 font-medium">Puntaje: </span>
            <span className="font-bold text-green-700"> {score} / {nuumberCases}</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-8xl min-h-[550px] grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="w-full h-auto text-black rounded-lg shadow p-2 sm:p-4 bg-[#17181c] border border-[#52585a] overflow-auto">
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
                  feedback={feedbackAIUser.feedback_test[i]}
                />
              ))}
              <TextRevealCard text={feedbackAIUser.feedback_positive} revealText={feedbackAIUser.feedback_general} />
            </div>
          )}
        </div>
        <Sandbox 
          codigo={codigo} 
          setCodigo={setCodigo} 
          ref={sandboxRef} 
          salida={salida}
          setSalida={setSalida}
          feedbackForDocente={feedbackForDocente}
          setFeedbackForDocente={setFeedbackForDocente}
          entrada={entrada}
          setEntrada={setEntrada}
          taskEnunciado={taskEnunciado}
        />
      </div>
    </div>
  );
}
