"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight-new"
import TextHeroPrimary from "@/components/core/TextHeroPrimary"
import TextHeroSecondary from "@/components/core/TextHeroSecondary"

export default function LoginPage() {
  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <TextHeroPrimary text="PythonLearn" />
        <TextHeroSecondary text="Plataforma Educativa" />

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
