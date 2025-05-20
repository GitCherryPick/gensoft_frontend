"use client";

import { Download, Share2 } from "lucide-react";
import Image from "next/image";

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      name: "Fundamentos de Python",
      issueDate: "15 Marzo 2025",
      issuer: "CodeAcademy",
      image: "/images/certificado1.jpg",
    },
    {
      id: 2,
      name: "Estructuras de Datos",
      issueDate: "20 Abril 2025",
      issuer: "Python Institute",
      image: "/images/certificado1.jpg",
    },
  ];

  const handleDownload = (cert) => {
    const link = document.createElement("a");
    link.href = cert.image;
    link.download = cert.name.replace(/\s+/g, "_") + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (cert) => {
    if (navigator.share) {
      navigator
        .share({
          title: cert.name,
          text: `Mira mi certificado de ${cert.issuer}`,
        })
        .catch((error) => console.error("Error al compartir:", error));
    } else {
      alert(
        "La funcionalidad de compartir no está disponible en este navegador."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <Image
              src={cert.image}
              alt={`Certificado: ${cert.name}`}
              width={300}
              height={200}
              className="rounded-md object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-200">{cert.name}</h3>
            <p className="text-sm text-gray-400">Emitido por: {cert.issuer}</p>
            <p className="text-sm text-gray-500 mb-4">
              Fecha: {cert.issueDate}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDownload(cert)}
                className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
              >
                <Download size={16} className="mr-2" />
                Descargar
              </button>
              <button
                onClick={() => handleShare(cert)}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              >
                <Share2 size={16} className="mr-2" />
                Compartir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
