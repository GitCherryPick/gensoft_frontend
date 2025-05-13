
"use client"
import Image from "next/image"
import Link from "next/link"
import { Download, Share2 } from 'lucide-react'

export default function TeacherProfile() {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Perfil principal */}
        <div className="bg-[#13141f] rounded-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=192&width=192"
                  alt="Foto de perfil"
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">Carlos Martínez</h1>
              <p className="text-gray-400 mb-6">Docente de Programación</p>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Sobre mí</h2>
                <p className="text-gray-300">
                  Docente con más de 10 años de experiencia en la enseñanza de programación. Especialista en Python y
                  estructuras de datos. Investigador en el área de inteligencia artificial aplicada a la educación.
                </p>
              </div>

              <button className="bg-[#6d5acd] hover:bg-[#5a48b0] text-white py-2 px-6 rounded-md transition">
                Editar perfil
              </button>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="bg-[#13141f] rounded-xl mb-6">
          <div className="flex flex-wrap">
            <Link href="#informacion" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Información
            </Link>
            <Link href="#cursos" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Cursos
            </Link>
            <Link href="#recursos" className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              Recursos
            </Link>
            <Link
              href="#certificados"
              className="flex items-center gap-2 px-6 py-4 text-white border-b-2 border-[#6d5acd]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              Certificados
            </Link>
          </div>
        </div>

        {/* Certificados */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Mis Certificados</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Certificado 1 */}
            <div className="bg-[#13141f] rounded-xl overflow-hidden">
              <div className="h-48 bg-[#1c1e2d] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=300"
                  alt="Fundamentos de Python"
                  width={300}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Fundamentos de Python</h3>
                <p className="text-gray-400 mb-4">Emisor: CodeAcademy</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Fecha: 15 Marzo 2025</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Share2 size={18} />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificado 2 */}
            <div className="bg-[#13141f] rounded-xl overflow-hidden">
              <div className="h-48 bg-[#1c1e2d] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=300"
                  alt="Estructuras de Datos"
                  width={300}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Estructuras de Datos</h3>
                <p className="text-gray-400 mb-4">Emisor: Python Institute</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Fecha: 20 Abril 2025</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Share2 size={18} />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificado 3 */}
            <div className="bg-[#13141f] rounded-xl overflow-hidden">
              <div className="h-48 bg-[#1c1e2d] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=300"
                  alt="Inteligencia Artificial para Educación"
                  width={300}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Inteligencia Artificial para Educación</h3>
                <p className="text-gray-400 mb-4">Emisor: EdTech Institute</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Fecha: 5 Mayo 2025</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Share2 size={18} />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificado 4 */}
            <div className="bg-[#13141f] rounded-xl overflow-hidden">
              <div className="h-48 bg-[#1c1e2d] flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=300"
                  alt="Diseño de Experiencias de Aprendizaje"
                  width={300}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Diseño de Experiencias de Aprendizaje</h3>
                <p className="text-gray-400 mb-4">Emisor: Learning Design Academy</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Fecha: 12 Junio 2025</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Download size={18} />
                      <span>Descargar</span>
                    </button>
                    <button className="flex items-center gap-1 text-[#6d5acd] hover:text-[#5a48b0]">
                      <Share2 size={18} />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}