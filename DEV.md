
# Estándares de Codificación

## 1. JavaScript / React

### 1.1 Variables

- **camelCase**:  
  Usado para variables y funciones. La primera palabra está en minúsculas y las siguientes comienzan con mayúsculas.

  **Ejemplos:**
  ```js
  let userName = "John";
  let totalAmount = 100;
  let currentPageNumber = 1;
  ```

- **UPPER_SNAKE_CASE**:  
  Usado para constantes inmutables. Todas las letras en mayúsculas y separadas por guiones bajos.

  **Ejemplos:**
  ```js
  const API_URL = 'https://api.midominio.com';
  const MAX_RETRIES = 5;
  ```

- **Uso de `const` y `let`**:  
  - Usar `const` por defecto.
  - Usar `let` solo si el valor cambiará.

  **Ejemplos:**
  ```js
  const API_URL = 'https://api.midominio.com';
  let currentPage = 1;
  ```

---

### 1.2 Funciones

- **camelCase** en nombres de funciones.
- Empezar siempre con un **verbo**.
- Preferir **arrow functions**.
- Mantener funciones **pequeñas y específicas**.

**Ejemplos:**
```js
const fetchStudents = async () => { /* lógica */ };
const handleButtonClick = () => { alert("Button clicked!"); };
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};
```

---

### 1.3 Manejo de Errores

- Siempre usar `try/catch` en funciones asíncronas.
- Mostrar errores claros en consola o al usuario.

**Ejemplo:**
```js
const getData = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

---

### 1.4 Imports y Exports

- Ordenar: **Librerías → Módulos internos → Estilos**
- Usar:
  - **Export default** para componentes principales.
  - **Export nombrado** para funciones/utilidades.

**Ejemplo:**
```js
import React from 'react';
import { formatDate } from '@/utils/formatDate';
import './App.css';

export const formatDate = (date) => { /* lógica */ };
```

---

### 1.5 Comentarios

- Explicar el **por qué**, no el **qué**.
- Usar `//` para comentarios breves y `/** */` para bloques.

**Ejemplos:**
```js
// Formatea la fecha en formato local
const formatDate = (date) => { /* lógica */ };

/**
 * Esta función obtiene los estudiantes ordenados
 * por su edad de manera ascendente.
 */
const getSortedStudents = () => { /* lógica */ };
```

---

## 2. TailwindCSS — Estándares de Codificación

### 2.1 Orden de Clases

Orden recomendado: **Layout → Box Model → Size → Colors → Borders → Effects → Text → Others**

**Ejemplo:**
```html
<div className="flex items-center justify-between p-4 w-full bg-gray-100 border rounded-lg shadow-md text-gray-900">
  ...
</div>
```

---

### 2.2 Responsive First (Mobile First)

Aplicar clases para pantallas pequeñas primero, luego `md:`, `lg:`, `xl:`.

**Ejemplo:**
```html
<div className="p-2 md:p-4 lg:p-6">
  Responsive content
</div>
```

---

### 2.3 Accesibilidad (a11y)

- Usar atributos `alt` en imágenes.
- Usar etiquetas semánticas correctamente (`button`, `nav`, `section`).

**Ejemplo:**
```html
<img src="logo.png" alt="Logo de la empresa" />
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Enviar
</button>
```

---

## 3. Estructura de Módulos

| Carpeta       | Propósito                                       | Regla de nombres         | Ejemplos                         |
|---------------|--------------------------------------------------|---------------------------|----------------------------------|
| `components/` | Componentes reutilizables de UI                  | PascalCase                | `StudentCard.jsx`, `Button.jsx` |
| `pages/`      | Vistas principales de la app (rutas)             | PascalCase                | `Home.jsx`, `Profile.jsx`       |
| `services/`   | Llamadas API, servicios externos                 | camelCase                 | `studentService.js`             |
| `utils/`      | Funciones de utilidad                            | camelCase                 | `formatDate.js`                 |
| `hooks/`      | Custom Hooks de React                            | camelCase                 | `useFetchStudents.js`           |
| `styles/`     | Archivos CSS o Tailwind                          | camelCase                 | `globals.css`, `tailwind.config.js` |
| `assets/`     | Imágenes, íconos, videos                         | camelCase                 | `logo.png`, `banner.mp4`        |
| `constants/`  | Constantes reutilizables                         | UPPER_SNAKE_CASE          | `ROUTES.js`, `API_ENDPOINTS.js` |
| `contexts/`   | Contextos globales de React                      | camelCase                 | `authContext.js`                |
| `layouts/`    | Estructuras grandes (Navbar, Sidebar, etc.)     | PascalCase                | `MainLayout.jsx`                |
