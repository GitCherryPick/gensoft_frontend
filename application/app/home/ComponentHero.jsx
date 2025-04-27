"use client"
import { HyperText } from "@/components/magicui/hyper-text"
import ComponentRotatingWord from "./ComponentRotatingWord"

export default function ComponentHero() {
  return (
    <div className="space-y-0">
      <div className="flex items-center justify-start -mb-1">
        <p className="text-light-3 text-sm tracking-wider uppercase">Aprende a tu ritmo</p>
      </div>

      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-1 leading-none mb-3 whitespace-nowrap overflow-visible">
        <div className="mb-0">
          <HyperText
            className="text-3xl sm:text-4xl md:text-5xl p-0 font-bold text-light-1 font-sans"
            animateOnHover={false}
            startOnView={false}
            duration={0}
          >
            APRENDER PYTHON
          </HyperText>
        </div>

        <div className="-mt-3">
          <HyperText
            className="text-3xl sm:text-4xl md:text-5xl p-0 font-bold text-light-1 font-sans inline-block"
            animateOnHover={false}
            startOnView={false}
            duration={0}
          >
            PUEDE SER
          </HyperText>{" "}
          <ComponentRotatingWord />
        </div>
      </div>

      <p className="text-light-2 text-base sm:text-lg mb-8 max-w-md">
        Comienza en el mundo de la programación de forma práctica con Python. Diseñado para principiantes, avanza a tu
        ritmo y desarrolla habilidades reales.
      </p>
    </div>
  )
}
