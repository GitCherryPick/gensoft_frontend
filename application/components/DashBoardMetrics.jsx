import { useState } from "react";

export const LabDashboardModal = ({ labStats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow"
      >
        Ver Dashboard
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl bg-gray-800 rounded-lg p-6 shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Dashboard del Laboratorio
            </h2>

            {!labStats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded p-3">
                  <p className="text-sm text-gray-300">Tests Totales</p>
                  <p className="text-xl font-bold text-white">
                    {labStats?.totalTests}
                  </p>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <p className="text-sm text-gray-300">Aceptados</p>
                  <p className="text-xl font-bold text-white">
                    {labStats?.acceptedTests} (
                    {(
                      (labStats?.acceptedTests / labStats?.totalTests) *
                        100 || 0
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <p className="text-sm text-gray-300">Fallidos</p>
                  <p className="text-xl font-bold text-white">
                    {labStats?.failedTests} (
                    {(
                      (labStats?.failedTests / labStats?.totalTests) *
                        100 || 0
                    ).toFixed(1)}
                    %)
                  </p>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <p className="text-sm text-gray-300">Prom. Notas</p>
                  <p className="text-xl font-bold text-white">
                    {labStats?.averageGrade.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-700 rounded p-3 col-span-2 md:col-span-2">
                  <p className="text-sm text-gray-300">Hints Usados</p>
                  <p className="text-xl font-bold text-white">
                    {labStats?.hintsUsed}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">Cargando métricas...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
