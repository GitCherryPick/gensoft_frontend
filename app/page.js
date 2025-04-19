"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight-new"
import Input from "@/components/core/Input"

export default function LoginPage() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-dark-1 relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-hero-primary">
          PythonLearn <br /> Plataforma Educativa
        </h1>

        <p className="text-hero-secondary">
          Si no tiene una cuenta asignada, contacte al administrador de su organizacion.
        </p>

        {/* Test Input Component */}
        <div className="mt-6 max-w-md mx-auto">
          <Input label="Correo Electrónico" placeholder="ejemplo@dominio.com" type="email" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Link href="/role-student" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-dark-2 border-neutral-700 hover:bg-dark-1 text-light-1 text-lg"
            >
              Estudiante
            </Button>
          </Link>
          <Link href="/role-admin" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-dark-2 border-neutral-700 hover:bg-dark-1 text-light-1 text-lg"
            >
              Admin
            </Button>
          </Link>
          <Link href="/role-teacher" className="w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto px-8 py-6 bg-dark-2 border-neutral-700 hover:bg-dark-1 text-light-1 text-lg"
            >
              Docente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
