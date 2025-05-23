"use client";

import { useEffect, useState } from 'react';
import { TextAnimate } from "@/components/magicui/text-animate";
import PromiseButton from "@/components/core/PromiseButton";
import { MessageCircle } from 'lucide-react';

export default function RightPanel() {
  const [showContent, setShowContent] = useState(false);
  const message = `Puedes enviar tu código cuando estés listo. Recibirás sugerencias hasta que llegues a la solución correcta.`;
  const subMessage = `Envíalo las veces que necesites`;

  useEffect(() => {
    // Pequeño retraso antes de mostrar el contenido
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // 300ms de retraso

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = async () => {
    // Simulamos una operación asíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Solicitando ayuda...');
        // Aquí iría la lógica real de solicitud de ayuda
        resolve();
      }, 1000);
    });
  };

  if (!showContent) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 overflow-y-auto flex-1">
        <div className="max-w-4xl w-full space-y-6">
          {/* Encabezado con animación */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">AI</div>
            <h2 className="text-lg font-semibold">
              <TextAnimate animation="blurIn" delay={0.3}>
                Asistente de Programación
              </TextAnimate>
            </h2>
          </div>
          
          {/* Contenido principal con animación */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="mb-4 leading-relaxed">
              <TextAnimate animation="blurIn" delay={0.6}>
                {message}
              </TextAnimate>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              <TextAnimate animation="blurIn" delay={0.9}>
                {subMessage}
              </TextAnimate>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón de acción en la parte inferior */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <PromiseButton
          onClick={handleButtonClick}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          loadingText="Solicitando ayuda..."
        >
          <MessageCircle className="w-5 h-5" />
          <span>Necesito ayuda</span>
        </PromiseButton>
      </div>
    </div>
  );
}
