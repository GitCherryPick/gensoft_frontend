**Estándares de codificación**
1.1 Variables
• camelCase:
Es una convención donde la primera palabra está en minúsculas y las siguientes palabras empiezan con mayúsculas.
Se usa para variables y funciones.

Ejemplos:

let userName = "John";  
let totalAmount = 100;  
let currentPageNumber = 1;

• UPPER_SNAKE_CASE:
Se usa para constantes inmutables, donde todas las letras están en mayúsculas y se separan por guiones bajos.

Ejemplos:

const API_URL = 'https://api.midominio.com';  
const MAX_RETRIES = 5;

• Uso de const y let:
Usar const por defecto para variables que no cambiarán.
Usar let solo cuando se necesite cambiar el valor de la variable.

Ejemplos:

const API_URL = 'https://api.midominio.com';  // No cambia
let currentPage = 1;  // Cambia a medida que se navega
________________________________________
1.2 Funciones
• camelCase en nombres de funciones:
Las funciones deben seguir la convención de camelCase.
Esto ayuda a mantener un estilo coherente en todo el código.

Ejemplo:

const fetchStudents = async () => { /* lógica */ };  
const handleButtonClick = () => { /* lógica */ };

• Empezar siempre con un verbo:
Los nombres de las funciones deben comenzar con un verbo que describa claramente lo que hace la función.
Los verbos comunes son: fetch, handle, sort, calculate, update.

Ejemplo:

const fetchStudents = async () => { /* obtener lista de estudiantes */ };
const sortItems = (items) => { /* ordenar los elementos */ };

• Usar preferentemente arrow functions:
Es preferible usar arrow functions para declarar funciones, ya que son más concisas y mantienen el contexto de this de manera adecuada.

Ejemplo:

const fetchStudents = async () => { /* lógica */ };  
const handleClick = () => { /* lógica */ };

• Mantener funciones pequeñas y específicas:
Las funciones deben ser pequeñas y cumplir una sola responsabilidad (principio de responsabilidad única).
Esto mejora la legibilidad y facilita las pruebas.

Ejemplo:

const calculateTotal = (items) => {  // Función pequeña y con un único objetivo
  return items.reduce((total, item) => total + item.price, 0);
};

const handleButtonClick = () => {  // Función simple que maneja un evento
  alert("Button clicked!");
};
________________________________________
1.3 Manejo de Errores
•	Siempre capturar errores en funciones asíncronas (try/catch).
•	Mostrar errores claros en consola o al usuario.
Ejemplo:
const getData = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
________________________________________
1.4 Imports y Exports
•	import primero librerías, luego módulos internos, luego estilos.
•	Usar exportación por defecto para componentes principales y exportación nombrada para utilidades.
Ejemplo:
import React from 'react';
import { formatDate } from '@/utils/formatDate';
import './App.css';

// Export nombrado
export const formatDate = (date) => { /* lógica */ };
________________________________________
1.5 Comentarios
•	Comentar solo lo necesario, explicando el por qué, no el qué.
•	Usar // para comentarios breves, /** */ para bloques más largos.
Ejemplo:
// Formatea la fecha en formato local
const formatDate = (date) => { /* lógica */ };

/**
 * Esta función obtiene los estudiantes ordenados
 * por su edad de manera ascendente.
 */
const getSortedStudents = () => { /* lógica */ };
________________________________________
2. TailwindCSS — Estándares de codificación
2.1 Orden de Clases
•	Seguir el orden: Layout → Box Model → Size → Colors → Borders → Effects → Text → Others.
Ejemplo:
<div className="flex items-center justify-between p-4 w-full bg-gray-100 border rounded-lg shadow-md text-gray-900">
  ...
</div>
________________________________________
2.2 Responsive First (Mobile First)
•	Aplicar clases para pantallas pequeñas primero, luego agregar md:, lg:, xl:.
Ejemplo:
<div className="p-2 md:p-4 lg:p-6">
  Responsive content
</div>
________________________________________
2.3 Accesibilidad (a11y)
•	Siempre usar atributos alt en imágenes.
•	Usar etiquetas semánticas (button, nav, section) correctamente.
Ejemplo:
<img src="logo.png" alt="Logo de la empresa" />
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Enviar
</button>
________________________________________
Módulos Estándares:

/components/
Propósito: Componentes reutilizables de UI.
Reglas de nombres: PascalCase
Ejemplos de archivo: StudentCard.jsx, Button.jsx

/pages/
Propósito: Vistas principales de la app. Cada página que representa una ruta.
Reglas de nombres: PascalCase
Ejemplos de archivo: Home.jsx, Profile.jsx

/services/
Propósito: Lógica para llamadas API, servicios externos, etc.
Reglas de nombres: camelCase
Ejemplos de archivo: studentService.js, authService.js

/utils/
Propósito: Funciones de utilidad que no dependen de la UI.
Reglas de nombres: camelCase
Ejemplos de archivo: formatDate.js, calculateAge.js

/hooks/
Propósito: Custom Hooks de React.
Reglas de nombres: camelCase
Ejemplos de archivo: useFetchStudents.js, useModal.js

/styles/
Propósito: Archivos CSS o configuraciones de Tailwind (opcional si todo es inline).
Reglas de nombres: camelCase
Ejemplos de archivo: globals.css, tailwind.config.js

/assets/
Propósito: Imágenes, íconos, videos estáticos.
Reglas de nombres: camelCase
Ejemplos de archivo: logo.png, banner.mp4

/constants/
Propósito: Constantes reutilizables.
Reglas de nombres: UPPER_SNAKE_CASE
Ejemplos de archivo: ROUTES.js, API_ENDPOINTS.js

/contexts/
Propósito: Contextos globales de React.
Reglas de nombres: camelCase
Ejemplos de archivo: authContext.js, themeContext.js

/layouts/
Propósito: Estructuras grandes como Navbar, Footer, Sidebar.
Reglas de nombres: PascalCase
Ejemplos de archivo: MainLayout.jsx, DashboardLayout.jsx