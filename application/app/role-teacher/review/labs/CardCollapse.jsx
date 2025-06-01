import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { useState } from "react";
import { ROUTES } from "@/lib/navigation";

export default function CardCollapse({ element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <a className="text-lg font-semibold text-indigo-100 mb-2" href={`${ROUTES.TEACHER.REVIEW_LABS_TASK}/${element.id}`}>{element.title}</a>
      <div className="flex justify-between">
        <div className="text-sm text-indigo-500 mb-2">
          Creado: {element.created_at ? new Date(element.created_at).toLocaleDateString('es-ES') : 'Fecha no disponible'}
        </div>
        <div className="text-sm text-rose-400 mb-2">
          Termina: {element.ended_at ? new Date(element.ended_at).toLocaleDateString('es-ES') : 'Fecha no disponible'}
        </div>
      </div>
      <CollapsibleTrigger>
        <div className="flex items-center justify-center">
          {!isOpen ? (
            <>
              <CircleChevronDown className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-sm font-semibold text-gray-500">Ver enunciado</p>
            </>
          ) : (
            <>
              <CircleChevronUp className="w-4 h-4 text-gray-500 mr-2" />
              <p className="text-sm font-semibold text-gray-500">Ocultar enunciado</p>
            </>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 p-4 bg-slate-700 rounded-lg">
        <p className="text-white">{element.enunciado}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}