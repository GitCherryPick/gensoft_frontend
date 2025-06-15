import { useState } from "react";
import FadeIn from "./FadeIn";
import CodePanel from "./CodePanel";
import MemoryPanels from "./MemoryPanels";
import EXAMPLES from "./Examples";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const MemorySimulator = ({ initialState }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlaySpeed] = useState(1500);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const memoryState = initialState || EXAMPLES[selectedExampleIndex].state;

  const handleExampleChange = (e) => {
    const index = Number.parseInt(e.target.value);
    setSelectedExampleIndex(index);
    setCurrentStepIndex(0);
    if (isAutoPlaying) {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsAutoPlaying(false);
    }
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

        <PanelGroup direction="horizontal" className="h-full">
          <Panel defaultSize={60} minSize={30}>
            <CodePanel
              memoryState={memoryState}
              currentStepIndex={currentStepIndex}
              setCurrentStepIndex={setCurrentStepIndex}
              isAutoPlaying={isAutoPlaying}
              setIsAutoPlaying={setIsAutoPlaying}
              autoPlayInterval={autoPlayInterval}
              setAutoPlayInterval={setAutoPlayInterval}
              autoPlaySpeed={autoPlaySpeed}
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-gray-500 cursor-col-resize" />

          <Panel defaultSize={40} minSize={20}>
            <MemoryPanels currentStep={memoryState.steps[currentStepIndex]} />
          </Panel>
        </PanelGroup>
      </div>
    </FadeIn>
  );
};

export default MemorySimulator;
