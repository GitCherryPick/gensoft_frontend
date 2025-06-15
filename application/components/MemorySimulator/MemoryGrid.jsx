import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const MemoryGrid = ({ currentStep }) => {
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
      <div className="text-center p-4">
        <h4 className="text-xl font-bold text-white mb-2 flex justify-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          Así se ve la Memoria de tu Computadora
        </h4>
        <p className="text-sm text-gray-300">
          Cada cajita representa un espacio donde Python guarda información
        </p>
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
                <div className="absolute -top-2 -right-2 text-sm bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {icon}
                </div>
                <div className="text-xs leading-none opacity-60 mb-1">
                  #{index}
                </div>
                <div className="text-xs leading-none font-bold truncate w-full text-center px-1 mb-1">
                  {variableName}
                </div>
                <div className="text-xs leading-none opacity-80 truncate w-full text-center px-1">
                  {displayValue}
                </div>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-600 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
                  <div className="font-semibold">{slot.variable}</div>
                  <div>
                    Valor:{" "}
                    <span className="text-yellow-300">
                      {JSON.stringify(slot.value)}
                    </span>
                  </div>
                  <div>
                    Tipo: <span className="text-blue-300">{slot.dataType}</span>
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

export default MemoryGrid;
