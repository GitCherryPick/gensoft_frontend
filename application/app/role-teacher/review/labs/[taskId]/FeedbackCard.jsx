import toast from "react-hot-toast"

export default function FeedBackCard({selected}) {
  const copyFeedback = (msg) => {
    navigator.clipboard.writeText(msg);
    console.log(msg)
    toast.success("Texto de feedback copiado");
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Feedback de la IA</h2>
        <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
          Intentos: {selected?.n_intentos ?? 0}
        </span>
      </div>

      <div className="space-y-3">
        {selected?.feedback_ai?.map((msg, idx) => (
          <div
            key={idx}
            className="bg-zinc-800 border border-indigo-500/50 rounded-lg p-3 relative group"
          >
            <p className="text-sm leading-relaxed text-indigo-100">{msg}</p>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-500"
                title="Aceptar sugerencia"
                onClick={()=>copyFeedback(msg)}
              >
                ✓
              </button>
              <button
                className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-500"
                title="Rechazar sugerencia"
              >
                ✗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}