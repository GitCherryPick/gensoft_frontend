"use client";
import { Code, X } from 'lucide-react';
import { useState } from "react"

const projects = [
  {
    id: 1,
    name: "Calculadora Simple",
    description: "Calculadora con operaciones básicas",
    code: `# Calculadora Simple en Python
# Este proyecto implementa una calculadora básica con operaciones fundamentales

def sumar(a, b):
    """Función para sumar dos números"""
    return a + b

def restar(a, b):
    """Función para restar dos números"""
    return a - b

def multiplicar(a, b):
    """Función para multiplicar dos números"""
    return a * b

def dividir(a, b):
    """Función para dividir dos números"""
    if b != 0:
        return a / b
    else:
        return "Error: División por cero"

def calculadora():
    """Función principal de la calculadora"""
    print("=== Calculadora Simple ===")
    print("Operaciones disponibles:")
    print("1. Sumar")
    print("2. Restar") 
    print("3. Multiplicar")
    print("4. Dividir")
    print("5. Salir")
    
    while True:
        try:
            opcion = int(input("\\nSelecciona una opción (1-5): "))
            
            if opcion == 5:
                print("¡Gracias por usar la calculadora!")
                break
            elif opcion in [1, 2, 3, 4]:
                num1 = float(input("Ingresa el primer número: "))
                num2 = float(input("Ingresa el segundo número: "))
                
                if opcion == 1:
                    resultado = sumar(num1, num2)
                    print(f"Resultado: {num1} + {num2} = {resultado}")
                elif opcion == 2:
                    resultado = restar(num1, num2)
                    print(f"Resultado: {num1} - {num2} = {resultado}")
                elif opcion == 3:
                    resultado = multiplicar(num1, num2)
                    print(f"Resultado: {num1} × {num2} = {resultado}")
                elif opcion == 4:
                    resultado = dividir(num1, num2)
                    print(f"Resultado: {num1} ÷ {num2} = {resultado}")
            else:
                print("Opción no válida. Por favor, selecciona una opción del 1 al 5.")
                
        except ValueError:
            print("Error: Por favor, ingresa un número válido.")
        except Exception as e:
            print(f"Error inesperado: {e}")

# Ejecutar la calculadora
if __name__ == "__main__":
    calculadora()`,
  },
  {
    id: 2,
    name: "Juego de Adivinanza",
    description: "Juego para adivinar un número aleatorio",
    code: `# Juego de Adivinanza de Números
# El usuario debe adivinar un número aleatorio entre 1 y 100

import random

def juego_adivinanza():
    """Función principal del juego de adivinanza"""
    print("=== ¡Bienvenido al Juego de Adivinanza! ===")
    print("He pensado en un número entre 1 y 100.")
    print("¡Intenta adivinarlo!")
    
    # Generar número aleatorio
    numero_secreto = random.randint(1, 100)
    intentos = 0
    max_intentos = 7
    
    print(f"Tienes {max_intentos} intentos para adivinarlo.")
    
    while intentos < max_intentos:
        try:
            # Solicitar entrada del usuario
            intento = int(input(f"\\nIntento {intentos + 1}/{max_intentos}: "))
            intentos += 1
            
            # Verificar si el número está en el rango válido
            if intento < 1 or intento > 100:
                print("Por favor, ingresa un número entre 1 y 100.")
                continue
            
            # Comparar con el número secreto
            if intento == numero_secreto:
                print(f"\\n🎉 ¡Felicitaciones! ¡Adivinaste el número {numero_secreto}!")
                print(f"Lo lograste en {intentos} intentos.")
                
                # Evaluar el rendimiento
                if intentos <= 3:
                    print("¡Excelente! Eres muy bueno en esto.")
                elif intentos <= 5:
                    print("¡Bien hecho! Buen trabajo.")
                else:
                    print("¡Lo lograste! Sigue practicando.")
                break
                
            elif intento < numero_secreto:
                print("📈 El número es mayor. ¡Intenta con uno más grande!")
                
            else:
                print("📉 El número es menor. ¡Intenta con uno más pequeño!")
            
            # Mostrar intentos restantes
            intentos_restantes = max_intentos - intentos
            if intentos_restantes > 0:
                print(f"Te quedan {intentos_restantes} intentos.")
            
        except ValueError:
            print("Error: Por favor, ingresa un número válido.")
            
    else:
        # Si se agotaron los intentos
        print(f"\\n😔 ¡Se agotaron los intentos!")
        print(f"El número era: {numero_secreto}")
        print("¡Mejor suerte la próxima vez!")

def jugar_otra_vez():
    """Función para preguntar si quiere jugar otra vez"""
    while True:
        respuesta = input("\\n¿Quieres jugar otra vez? (s/n): ").lower()
        if respuesta in ['s', 'si', 'sí']:
            return True
        elif respuesta in ['n', 'no']:
            return False
        else:
            print("Por favor, responde 's' para sí o 'n' para no.")

# Función principal
def main():
    """Función principal del programa"""
    print("¡Hola! Este es un juego de adivinanza de números.")
    
    while True:
        juego_adivinanza()
        
        if not jugar_otra_vez():
            print("\\n¡Gracias por jugar! ¡Hasta la próxima! 👋")
            break

# Ejecutar el juego
if __name__ == "__main__":
    main()`,
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewCode = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-700 bg-gray-800 rounded-lg p-4"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-900 text-purple-400 flex items-center justify-center">
                <Code size={20} />
              </div>
              <h4 className="ml-3 font-medium text-gray-200">{project.name}</h4>
            </div>
            <p className="mt-3 text-sm text-gray-400">{project.description}</p>
            <div className="mt-4 flex justify-end">
            <button onClick={() => handleViewCode(project)} className="text-indigo-400 hover:text-indigo-300 text-sm">
                Ver código
              </button>
            </div>
          </div>
        ))}
      </div>
            {/* Modal para mostrar código */}
            {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            {/* Header del modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-gray-200">{selectedProject.name} - Código</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="bg-gray-900 rounded-lg p-4 h-full overflow-y-auto custom-scrollbar">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">{selectedProject.code}</pre>
              </div>
            </div>

            {/* Footer del modal */}
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }
        
        /* Para Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 #374151;
        }
      `}</style>
    </div>
  );
}


  

