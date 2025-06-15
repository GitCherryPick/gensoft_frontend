import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

const CodePanel = ({
  memoryState,
  currentStepIndex,
  setCurrentStepIndex,
  isAutoPlaying,
  setIsAutoPlaying,
  autoPlayInterval,
  setAutoPlayInterval,
  autoPlaySpeed,
}) => {
  const currentStep = memoryState.steps[currentStepIndex];

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < memoryState.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (isAutoPlaying) {
      handleToggleAutoPlay();
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleToggleAutoPlay = () => {
    if (!isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < memoryState.steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, autoPlaySpeed);
      setAutoPlayInterval(interval);
      setIsAutoPlaying(true);
    } else {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsAutoPlaying(false);
    }
  };

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

  return (
    <div className="space-y-4">
      <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-white">Código</h3>
        <div className="overflow-auto max-h-[300px] bg-[#0D0C11] rounded-lg p-2 text-gray-300">
          {renderCodeLines()}
        </div>
      </div>

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
            aria-label={isAutoPlaying ? "Pausar" : "Reproducir automáticamente"}
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
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white
            hover:bg-blue-700
          "
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Paso {currentStepIndex + 1} de {memoryState.steps.length}
      </div>

      <div className="border border-gray-700/30 rounded-xl bg-[#131219] p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-white">Descripción</h3>
        <div
          className="text-base text-gray-300 bg-[#0D0C11] p-3 rounded-lg"
          aria-live="polite"
        >
          {currentStep.description}
        </div>
      </div>

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
  );
};

export default CodePanel;
