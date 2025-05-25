import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { BadgeInfo, Bird } from "lucide-react";

export default function PopOverError() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative bg-gray-900 rounded-full p-1 bottom-4">
          <Bird className="text-white" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-gray-900 opacity-75">
        <p className="w-full text-white font-bold text-center">TIPOS DE ERRORES</p>
        <div className="grid grid-flow-col grid-rows-6 gap-[2px]">
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-green-500 outline-black/10 dark:outline-white/10"></div>
            <p>Sintáxis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-red-500 outline-black/10 dark:outline-white/10"></div>
            <p>Tiempo de ejecución</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-cyan-500 outline-black/10 dark:outline-white/10"></div>
            <p>Operación de tipo</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-purple-500 outline-black/10 dark:outline-white/10"></div>
            <p>Valor no válido</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-orange-500 outline-black/10 dark:outline-white/10"></div>
            <p>Indice fuera de rango</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-rose-500 outline-black/10 dark:outline-white/10"></div>
            <p>Atributo no válido</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-lime-500 outline-black/10 dark:outline-white/10"></div>
            <p>Clave incorrecta</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-indigo-500 outline-black/10 dark:outline-white/10"></div>
            <p>División por cero</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-teal-500 outline-black/10 dark:outline-white/10"></div>
            <p>Importación incorrecta</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-yellow-500 outline-black/10 dark:outline-white/10"></div>
            <p>Variable sin definir</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-sm outline -outline-offset-1 bg-fuchsia-500 outline-black/10 dark:outline-white/10"></div>
            <p>Variable sin utilizar</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}