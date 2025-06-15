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
    <div className="w-full space-y-4 px-2 sm:px-4">
      <div className="text-center p-2 sm:p-3">
        <h4 className="text-lg sm:text-xl font-bold text-white mb-2 flex justify-center items-center gap-2 flex-wrap">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
          <span className="text-center">
            Así se ve la Memoria de tu Computadora
          </span>
        </h4>
        <p className="text-xs sm:text-sm text-gray-300 px-2">
          Cada cajita representa un espacio donde Python guarda información
        </p>
      </div>

      <div className="bg-[#0D0C11] rounded-xl p-2 sm:p-4 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 gap-2">
          <h5 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
            Memoria RAM
          </h5>
          <div className="text-xs sm:text-sm text-gray-500">
            {currentSlot} de {GRID_SIZE} espacios ocupados
          </div>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 bg-black/30 rounded-lg border-2 border-gray-700/50 w-full max-w-full lg:max-w-4xl xl:max-w-6xl mx-auto">
          {memorySlots.map((slot, index) => {
            if (!slot) {
              return (
                <motion.div
                  key={`empty-${index}`}
                  initial={{ opacity: 0.3, scale: 0.9 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="relative w-full aspect-square min-w-16 max-w-24 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-600/30 transition-all duration-300 cursor-help group"
                  title="Espacio de memoria vacío - disponible para usar"
                >
                  <div className="text-xs sm:text-sm font-bold">{index}</div>
                  <div className="text-xs opacity-60 hidden xs:block">
                    vacío
                  </div>

                  <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 sm:px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
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
              : String(slot.value).slice(0, 4);

            const variableName = slot.variable.includes(".")
              ? slot.variable.split(".")[1]
              : slot.variable;

            const shortVariableName =
              variableName.length > 6
                ? variableName.slice(0, 4) + "..."
                : variableName;

            return (
              <motion.div
                key={`slot-${index}-${slot.variable}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className={`relative w-full aspect-square min-w-16 max-w-24 ${bgColor} border-2 ${borderColor} rounded-lg shadow-lg ${glowColor} flex flex-col items-center justify-center ${textColor} font-mono cursor-pointer transition-all duration-300 group hover:shadow-xl`}
                title={`${slot.variable}: ${slot.value} (tipo: ${slot.dataType})`}
              >
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-xs sm:text-sm bg-white rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg">
                  {icon}
                </div>

                <div className="text-xs leading-none opacity-60 mb-1">
                  #{index}
                </div>

                <div className="text-xs leading-none font-bold truncate w-full text-center px-1 mb-1">
                  <span className="hidden xs:inline">{shortVariableName}</span>
                  <span className="xs:hidden">{variableName.slice(0, 2)}</span>
                </div>

                <div className="text-xs leading-none opacity-80 truncate w-full text-center px-1">
                  {displayValue}
                </div>

                <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-600 text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl pointer-events-none min-w-max">
                  <div className="font-semibold text-xs">{slot.variable}</div>
                  <div className="text-xs">
                    Valor:{" "}
                    <span className="text-yellow-300">
                      {JSON.stringify(slot.value)}
                    </span>
                  </div>
                  <div className="text-xs">
                    Tipo: <span className="text-blue-300">{slot.dataType}</span>
                  </div>
                  <div className="text-xs">
                    Posición: <span className="text-green-300">#{index}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2 bg-green-500/20 px-2 py-1 rounded border border-green-500/30">
            <span>🌍</span>
            <span className="text-green-300">Global</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/20 px-2 py-1 rounded border border-blue-500/30">
            <span>🏠</span>
            <span className="text-blue-300">Local</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-purple-500/20 px-2 py-1 rounded border border-purple-500/30">
            <span>🔗</span>
            <span className="text-purple-300">Referencia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGrid;
