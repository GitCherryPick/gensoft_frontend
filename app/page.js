"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight-new"

export default function LoginPage() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          PythonLearn <br /> Plataforma Educativa
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Si no tiene una cuenta asignada, contacte al administrador de su organizacion.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Link href="/role-student" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-black/50 border-neutral-700 hover:bg-black/70 text-neutral-200 text-lg"
            >
              Estudiante
            </Button>
          </Link>
          <Link href="/role-admin" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-black/50 border-neutral-700 hover:bg-black/70 text-neutral-200 text-lg"
            >
              Admin
            </Button>
          </Link>
          <Link href="/role-teacher" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-black/50 border-neutral-700 hover:bg-black/70 text-neutral-200 text-lg"
            >
              Docente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

