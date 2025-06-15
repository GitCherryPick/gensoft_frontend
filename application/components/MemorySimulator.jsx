"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

// Definición de tipos para el estado de memoria
/**
 * @typedef {Object} MemoryState
 * @property {string[]} codeLines
 * @property {Array<{
 *   lineIndex: number,
 *   stackFrames: Array<{
 *     functionName: string,
 *     variables: Array<{name: string, value: any, type: string}>
 *   }>,
 *   heapObjects: Array<{
 *     id: number,
 *     description: string,
 *     address: string,
 *     size: string
 *   }>,
 *   globals: Array<{name: string, value: any, type: string}>,
 *   consoleOutput: string,
 *   description: string
 * }>} steps
 */

// Ejemplos predefinidos
const EXAMPLES = [
  {
    name: "Variables y asignación",
    state: {
      codeLines: [
        "# Ejemplo de variables y asignación",
        "a = 5",
        "b = 10",
        "c = a + b",
        "print(c)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 1,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'a' y se le asigna el valor entero 5.",
        },
        {
          lineIndex: 2,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'b' y se le asigna el valor entero 10.",
        },
        {
          lineIndex: 3,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
            {
              name: "c",
              value: 15,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'c' y se le asigna el resultado de sumar 'a' y 'b', que es 15.",
        },
        {
          lineIndex: 4,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
            {
              name: "c",
              value: 15,
              type: "int",
            },
          ],
          consoleOutput: "15",
          description: "Se imprime el valor de 'c' en la consola.",
        },
      ],
    },
  },
  {
    name: "Funciones y variables locales",
    state: {
      codeLines: [
        "# Ejemplo de funciones y variables locales",
        "def calcular_area(radio):",
        "    pi = 3.14159",
        "    return pi * radio * radio",
        "",
        "nombre = 'Estudiante'",
        "lista_numeros = [1, 2, 3]",
        "area = calcular_area(5)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 5,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'nombre' y se le asigna un string que se almacena en el heap.",
        },
        {
          lineIndex: 6,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_numeros' y se le asigna una lista que se almacena en el heap.",
        },
        {
          lineIndex: 7,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se llama a la función 'calcular_area' con el argumento radio=5. Se crea un nuevo frame en la pila.",
        },
        {
          lineIndex: 2,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
                {
                  name: "pi",
                  value: 3.14159,
                  type: "float",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable local 'pi' en el frame de 'calcular_area'.",
        },
        {
          lineIndex: 3,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
                {
                  name: "pi",
                  value: 3.14159,
                  type: "float",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se calcula el valor de retorno: pi * radio * radio = 3.14159 * 5 * 5 = 78.53975.",
        },
        {
          lineIndex: 7,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
            {
              name: "area",
              value: 78.53975,
              type: "float",
            },
          ],
          consoleOutput: "",
          description:
            "La función 'calcular_area' retorna el valor 78.53975 que se asigna a la variable global 'area'. El frame de la función se elimina de la pila.",
        },
      ],
    },
  },
  {
    name: "Referencias y mutabilidad",
    state: {
      codeLines: [
        "# Ejemplo de referencias y mutabilidad",
        "lista_a = [1, 2, 3]",
        "lista_b = lista_a",
        "lista_b.append(4)",
        "print(lista_a)",
        "",
        "# Creando una copia",
        "lista_c = lista_a.copy()",
        "lista_c.append(5)",
        "print(lista_a)",
        "print(lista_c)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 1,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3]",
              address: "0x1000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_a' y se le asigna una lista [1, 2, 3] que se almacena en el heap.",
        },
        {
          lineIndex: 2,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3]",
              address: "0x1000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_b' y se le asigna la misma referencia que 'lista_a'. Ambas variables apuntan al mismo objeto en memoria.",
        },
        {
          lineIndex: 3,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se modifica la lista a través de 'lista_b' añadiendo el valor 4. Como 'lista_a' y 'lista_b' apuntan al mismo objeto, ambas variables ven el cambio.",
        },
        {
          lineIndex: 4,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se imprime 'lista_a', mostrando que contiene [1, 2, 3, 4] aunque el elemento 4 se añadió a través de 'lista_b'.",
        },
        {
          lineIndex: 7,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x2000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se crea la variable global 'lista_c' y se le asigna una copia de 'lista_a'. Ahora 'lista_c' apunta a un nuevo objeto en memoria con los mismos valores.",
        },
        {
          lineIndex: 8,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se modifica 'lista_c' añadiendo el valor 5. Como 'lista_c' es una copia, 'lista_a' y 'lista_b' no se ven afectadas por este cambio.",
        },
        {
          lineIndex: 9,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]\n[1, 2, 3, 4]",
          description:
            "Se imprime 'lista_a', que sigue conteniendo [1, 2, 3, 4].",
        },
        {
          lineIndex: 10,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]",
          description:
            "Se imprime 'lista_c', que contiene [1, 2, 3, 4, 5]. Esto demuestra que 'lista_c' es independiente de 'lista_a' y 'lista_b'.",
        },
      ],
    },
  },
];

// Componente FadeIn simplificado
const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default function MemorySimulator({ initialState }) {
  // Estado para controlar el paso actual y el ejemplo seleccionado
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1500); // ms

  // Usar los datos proporcionados, el ejemplo seleccionado, o el primer ejemplo
  const memoryState = initialState || EXAMPLES[selectedExampleIndex].state;
  const currentStep = memoryState.steps[currentStepIndex];

  // Referencia para el intervalo de reproducción automática
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  // Manejadores de eventos para los botones
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < memoryState.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (isAutoPlaying) {
      // Si está en reproducción automática y llega al final, detener
      handleToggleAutoPlay();
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleExampleChange = (e) => {
    const index = Number.parseInt(e.target.value);
    setSelectedExampleIndex(index);
    setCurrentStepIndex(0);
    // Si está reproduciendo, detener al cambiar de ejemplo
    if (isAutoPlaying) {
      handleToggleAutoPlay();
    }
  };

  const handleToggleAutoPlay = () => {
    if (!isAutoPlaying) {
      // Iniciar reproducción automática
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < memoryState.steps.length - 1) {
            return prev + 1;
          } else {
            // Detener cuando llegue al final
            clearInterval(interval);
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, autoPlaySpeed);

      setAutoPlayInterval(interval);
      setIsAutoPlaying(true);
    } else {
      // Detener reproducción automática
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsAutoPlaying(false);
    }
  };

  // Renderizar las líneas de código con la línea actual resaltada
  const renderCodeLines = () => {
    return memoryState.codeLines.map((line, index) => (
      <div
        key={index}
        className={`font-mono py-1 px-2 ${
          index === currentStep.lineIndex
            ? "bg-[rgba(176,161,255,0.15)] border-l-4 border-[#B0A1FF]"
            : ""
        }`}
      >
        {index + 1}. {line}
      </div>
    ));
  };

  // Renderizar los frames de la pila
  const renderStackFrames = () => {
    return (
      <AnimatePresence mode="popLayout">
        {currentStep.stackFrames.length === 0 ? (
          <div className="text-gray-500 italic text-sm p-2">
            No hay frames en la pila
          </div>
        ) : (
          currentStep.stackFrames.map((frame, frameIndex) => (
            <motion.div
              key={`${frameIndex}-${frame.functionName}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-700/30 rounded-lg p-2 mb-2 bg-[#131219] shadow-sm overflow-hidden"
            >
              <div className="font-semibold mb-1 text-white truncate">
                {frame.functionName}()
              </div>
              {frame.variables.map((variable, varIndex) => (
                <motion.div
                  key={`${varIndex}-${variable.name}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * varIndex }}
                  className="ml-4 font-mono text-sm text-gray-300 break-all"
                >
                  {variable.name}: {JSON.stringify(variable.value)}{" "}
                  <span className="text-gray-500">({variable.type})</span>
                </motion.div>
              ))}
            </motion.div>
          ))
        )}
      </AnimatePresence>
    );
  };

  // Renderizar los objetos del heap
  const renderHeapObjects = () => {
    return (
      <AnimatePresence mode="popLayout">
        {currentStep.heapObjects.length === 0 ? (
          <div className="text-gray-500 italic text-sm p-2">
            No hay objetos en el heap
          </div>
        ) : (
          currentStep.heapObjects.map((object) => (
            <motion.div
              key={object.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-700/30 rounded-lg p-2 mb-2 bg-[#131219] shadow-sm overflow-hidden"
            >
              <div className="font-mono text-sm text-gray-300 break-all">
                <span className="font-semibold text-[#B0A1FF]">
                  {object.address}
                </span>{" "}
                - {object.description}
              </div>
              <div className="text-xs text-gray-500">Tamaño: {object.size}</div>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    );
  };

  const renderGlobals = () => {
    return (
      <AnimatePresence mode="popLayout">
        {currentStep.globals.length === 0 ? (
          <div className="text-gray-500 italic text-sm p-2">
            No hay variables globales definidas
          </div>
        ) : (
          currentStep.globals.map((variable, index) => (
            <motion.div
              key={`${index}-${variable.name}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-sm mb-1 text-gray-300 break-all"
            >
              {variable.name}: {JSON.stringify(variable.value)}{" "}
              <span className="text-gray-500">({variable.type})</span>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    );
  };

  const renderMemoryGrid = () => {
    const GRID_SIZE = 12;
    const memorySlots = Array(GRID_SIZE).fill(null);

    let currentSlot = 0;
    const variablePositions = new Map();

    currentStep.globals.forEach((variable) => {
      const isReference =
        typeof variable.value === "string" && variable.value.startsWith("0x");
      const size = 1;

      if (currentSlot < GRID_SIZE) {
        variablePositions.set(variable.name, {
          start: currentSlot,
          size: size,
          type: "global",
          variable: variable,
          isReference: isReference,
        });

        memorySlots[currentSlot] = {
          variable: variable.name,
          type: "global",
          isReference: isReference,
          value: variable.value,
          dataType: variable.type,
        };
        currentSlot++;
      }
    });

    currentStep.stackFrames.forEach((frame) => {
      frame.variables.forEach((variable) => {
        const fullName = `${frame.functionName}.${variable.name}`;
        const isReference =
          typeof variable.value === "string" && variable.value.startsWith("0x");

        if (currentSlot < GRID_SIZE) {
          variablePositions.set(fullName, {
            start: currentSlot,
            size: 1,
            type: "local",
            variable: variable,
            isReference: isReference,
            functionName: frame.functionName,
          });

          memorySlots[currentSlot] = {
            variable: fullName,
            type: "local",
            isReference: isReference,
            value: variable.value,
            dataType: variable.type,
            functionName: frame.functionName,
          };
          currentSlot++;
        }
      });
    });

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-xl font-bold text-white mb-2 flex justify-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            Así se ve la Memoria de tu Computadora
          </h4>
          <p className="text-sm text-gray-300">
            Cada cajita representa un espacio donde Python guarda información
          </p>
        </div>

        <div className="bg-[#0D0C11] rounded-xl p-2">
          <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
            Guía de Colores
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
              <div>
                <div className="text-green-300 font-semibold">
                  Variables Globales
                </div>
                <div className="text-gray-400 text-xs">
                  Se pueden usar en todo el programa
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
              <div>
                <div className="text-blue-300 font-semibold">
                  Variables Locales
                </div>
                <div className="text-gray-400 text-xs">
                  Solo existen dentro de funciones
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg animate-pulse"></div>
              <div>
                <div className="text-purple-300 font-semibold">Referencias</div>
                <div className="text-gray-400 text-xs">
                  Apuntan a objetos grandes (listas, strings)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-700/10 p-3 rounded-lg border border-gray-600/20">
              <div className="w-4 h-4 bg-gray-600 rounded border-2 border-gray-500 border-dashed"></div>
              <div>
                <div className="text-gray-400 font-semibold">Memoria Vacía</div>
                <div className="text-gray-500 text-xs">
                  Disponible para usar
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0D0C11] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-white font-semibold flex items-center gap-2">
              Memoria RAM
            </h5>
            <div className="text-xs text-gray-500">
              {currentSlot} de {GRID_SIZE} espacios ocupados
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-6 bg-black/30 rounded-lg border-2 border-gray-700/50 max-w-2xl mx-auto">
            {memorySlots.map((slot, index) => {
              if (!slot) {
                return (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0.3, scale: 0.9 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    className="relative w-24 h-24 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-600/30 transition-all duration-300 cursor-help group"
                    title="Espacio de memoria vacío - disponible para usar"
                  >
                    <div className="text-sm font-bold">{index}</div>
                    <div className="text-xs opacity-60">vacío</div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Posición {index}: Libre
                    </div>
                  </motion.div>
                );
              }

              const isGlobal = slot.type === "global";
              const isLocal = slot.type === "local";
              const isReference = slot.isReference;
              let bgColor, borderColor, glowColor, textColor, icon;

              if (isReference) {
                bgColor = "bg-gradient-to-br from-purple-500 to-purple-600";
                borderColor = "border-purple-400";
                glowColor = "shadow-purple-500/50";
                textColor = "text-white";
                icon = "🔗";
              } else if (isGlobal) {
                bgColor = "bg-gradient-to-br from-green-500 to-green-600";
                borderColor = "border-green-400";
                glowColor = "shadow-green-500/50";
                textColor = "text-white";
                icon = "🌍";
              } else if (isLocal) {
                bgColor = "bg-gradient-to-br from-blue-500 to-blue-600";
                borderColor = "border-blue-400";
                glowColor = "shadow-blue-500/50";
                textColor = "text-white";
                icon = "🏠";
              }

              const displayValue = isReference
                ? slot.value.slice(-4)
                : String(slot.value).slice(0, 6);

              const variableName = slot.variable.includes(".")
                ? slot.variable.split(".")[1]
                : slot.variable;

              return (
                <motion.div
                  key={`slot-${index}-${slot.variable}`}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  transition={{
                    delay: 0.05 * index,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={`relative w-24 h-24 ${bgColor} border-2 ${borderColor} rounded-lg shadow-lg ${glowColor} flex flex-col items-center justify-center ${textColor} font-mono cursor-pointer transition-all duration-300 group hover:shadow-xl`}
                  title={`${slot.variable}: ${slot.value} (tipo: ${slot.dataType})`}
                >
                  {/* Icono en la esquina */}
                  <div className="absolute -top-2 -right-2 text-sm bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {icon}
                  </div>

                  {/* Contenido del slot más grande */}
                  <div className="text-xs leading-none opacity-60 mb-1">
                    #{index}
                  </div>
                  <div className="text-xs leading-none font-bold truncate w-full text-center px-1 mb-1">
                    {variableName}
                  </div>
                  <div className="text-xs leading-none opacity-80 truncate w-full text-center px-1">
                    {displayValue}
                  </div>

                  {/* Tooltip detallado */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-600 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
                    <div className="font-semibold">{slot.variable}</div>
                    <div>
                      Valor:{" "}
                      <span className="text-yellow-300">
                        {JSON.stringify(slot.value)}
                      </span>
                    </div>
                    <div>
                      Tipo:{" "}
                      <span className="text-blue-300">{slot.dataType}</span>
                    </div>
                    <div>
                      Posición: <span className="text-green-300">#{index}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <FadeIn>
      <div className="p-2 space-y-6 bg-[#0D0C11] rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Simulador de Memoria Python
          </h2>

          <div className="flex items-center gap-2">
            <select
              value={selectedExampleIndex}
              onChange={handleExampleChange}
              className="bg-[#131219] text-gray-300 border border-gray-700 rounded-md px-3 py-2 text-sm"
            >
              {EXAMPLES.map((example, index) => (
                <option key={index} value={index}>
                  {example.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout responsivo usando grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel izquierdo: Código y Controles */}
          <div className="space-y-4">
            {/* Panel de código */}
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">Código</h3>
              <div className="overflow-auto max-h-[300px] bg-[#0D0C11] rounded-lg p-2 text-gray-300">
                {renderCodeLines()}
              </div>
            </div>

            {/* Controles de navegación */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                  aria-label="Paso anterior"
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" /> Anterior
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === memoryState.steps.length - 1}
                  aria-label="Paso siguiente"
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  Siguiente <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleToggleAutoPlay}
                  aria-label={
                    isAutoPlaying ? "Pausar" : "Reproducir automáticamente"
                  }
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="h-4 w-4" /> Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" /> Auto
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  aria-label="Reiniciar simulación"
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Indicador de progreso */}
            <div className="text-center text-sm text-gray-500">
              Paso {currentStepIndex + 1} de {memoryState.steps.length}
            </div>

            {/* Descripción del paso actual */}
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Descripción
              </h3>
              <div
                className="text-base text-gray-300 bg-[#0D0C11] p-3 rounded-lg"
                aria-live="polite"
              >
                {currentStep.description}
              </div>
            </div>

            {/* Consola */}
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">Consola</h3>
              <pre
                className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm overflow-auto max-h-[100px]"
                aria-live="polite"
              >
                {currentStep.consoleOutput || "> Programa en ejecución..."}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">Memoria</h3>
              <div
                className="overflow-auto max-h-[300px]"
                role="region"
                aria-label="Visualización de memoria"
              >
                {renderMemoryGrid()}
              </div>
            </div>

            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Stack (Pila de llamadas)
              </h3>
              <div
                className="overflow-auto max-h-[200px]"
                role="region"
                aria-label="Stack de memoria"
              >
                {renderStackFrames()}
              </div>
            </div>

            {/* Panel de heap */}
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Heap (Objetos)
              </h3>
              <div
                className="overflow-auto max-h-[200px]"
                role="region"
                aria-label="Heap de memoria"
              >
                {renderHeapObjects()}
              </div>
            </div>

            {/* Panel de variables globales */}
            <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Variables Globales
              </h3>
              <div
                className="overflow-auto max-h-[150px]"
                role="region"
                aria-label="Variables globales"
              >
                {renderGlobals()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
