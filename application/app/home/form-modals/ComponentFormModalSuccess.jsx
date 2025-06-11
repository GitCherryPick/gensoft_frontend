import { CheckCircle } from 'lucide-react';

export function SuccessModal({ show }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-dark-2 rounded-xl p-8 flex flex-col items-center shadow-lg border border-neutral-700">
        <CheckCircle size={48} className="text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-light-1">¡Registro exitoso!</h3>
        <p className="text-light-3 mb-2 text-center">Serás redirigido al dashboard en un segundo...</p>
      </div>
    </div>
  );
}