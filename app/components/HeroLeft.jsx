import Link from "next/link"
import { Play } from "lucide-react"

export default function HeroLeft() {
  return (
    <div className="w-full min-h-screen flex items-center bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-purple-100/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-xl mx-0 lg:mx-12 xl:mx-24 2xl:mx-36 text-left">
          <div className="flex items-center justify-start mb-2">
            <div className="h-px w-12 bg-light-3 mr-3"></div>
            <p className="text-light-3 text-sm tracking-wider uppercase">Aprende a tu ritmo</p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-light-1 leading-tight mb-4">
            Aprender Python <br className="hidden sm:block" />
            puede ser{" "}
            <span className="relative inline-block">
              increíble
              <span className="absolute bottom-1 left-0 w-full h-1 bg-light-1"></span>
            </span>
          </h1>

          <p className="text-light-2 text-base sm:text-lg mb-8 max-w-md">
            Comienza en el mundo de la programación de forma práctica con Python. Diseñado para principiantes, avanza a
            tu ritmo y desarrolla habilidades reales.
          </p>

          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <Link href="/role-student">
              <button className="w-full sm:w-auto bg-dark-2 border border-neutral-700 text-light-1 px-8 py-3 rounded-md hover:bg-dark-1 transition-colors">
                Comenzar gratis
              </button>
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-light-1 px-4 py-3 rounded-md hover:text-light-2 transition-colors">
              <Play className="h-5 w-5 mr-2" />
              Ver introducción
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
