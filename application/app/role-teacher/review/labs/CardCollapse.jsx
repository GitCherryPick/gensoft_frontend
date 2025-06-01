import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/navigation";

export default function CardCollapse({ element }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const redirectToTask = () => {
    router.push(ROUTES.TEACHER.REVIEW_LABS_TASK(element.id))
  }
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <button
        className="text-lg font-bold text-white hover:underline block mb-2"
        onClick={redirectToTask}
      >
        {element.title}
      </button>
      <div className="flex justify-between text-sm mb-2">
        <div className="text-indigo-500">
          Creado: {element.created_at ? new Date(element.created_at).toLocaleDateString('es-ES') : 'Fecha no disponible'}
        </div>
        <div className="text-rose-400">
          Termina: {element.ended_at ? new Date(element.ended_at).toLocaleDateString('es-ES') : 'Fecha no disponible'}
        </div>
      </div>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-center text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          {isOpen ? (
            <>
              <CircleChevronUp className="w-4 h-4 mr-2" />
              Ocultar enunciado
            </>
          ) : (
            <>
              <CircleChevronDown className="w-4 h-4 mr-2" />
              Ver enunciado
            </>
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2 bg-indigo-950 text-white text-sm p-4 rounded-lg">
        <p>{element.enunciado}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}