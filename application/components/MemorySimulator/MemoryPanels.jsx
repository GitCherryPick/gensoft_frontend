import { motion, AnimatePresence } from "framer-motion";
import MemoryGrid from "./MemoryGrid";

const MemoryPanels = ({ currentStep }) => {
  const renderStackFrames = () => (
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

  const renderHeapObjects = () => (
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

  const renderGlobals = () => (
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

  return (
    <div className="space-y-4">
      <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-white">Memoria</h3>
        <div
          className="overflow-auto max-h-[300px]"
          role="region"
          aria-label="Visualización de memoria"
        >
          <MemoryGrid currentStep={currentStep} />
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
  );
};

export default MemoryPanels;
