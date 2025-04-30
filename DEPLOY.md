# Instrucciones de Despliegue

## Requisitos

*   **Node.js:** Es necesario tener Node.js instalado.
    *   Disponible para descarga en: [https://nodejs.org/](https://nodejs.org/)

## Pasos

Los siguientes comandos se ejecutan desde el directorio raíz del proyecto.

1. **Navegar al directorio de la aplicación:**
   ```bash
   cd application
   ```
   Asegúrate de estar en el directorio correcto antes de proceder con la instalación de dependencias.

2.  **Instalación de Dependencias:**
    ```bash
    npm install
    ```
    Este comando descarga las dependencias necesarias utilizando NPM.

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
la aplicación estará disponible en la dirección `http://localhost:3000`.
   
4.  **Construcción para Producción:**
    ```bash
    npm run build
    ```
    Este comando genera la versión optimizada de la aplicación para el entorno de producción.

5.  **Inicio del Servidor:**
    ```bash
    npm start
    ```
    Este comando inicia el servidor de producción de Next.js.

luego de estos pasos, la aplicación estará disponible en la dirección `http://localhost:3000`.

![image](https://github.com/user-attachments/assets/5b838734-0de1-4715-b999-55d19f49f29f)


