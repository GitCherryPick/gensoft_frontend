/**
 * @typedef {Object} MemoryState
 * @property {string[]} codeLines
 * @property {Array<{
 *   lineIndex: number,
 *   stackFrames: Array<{
 *     functionName: string,
 *     variables: Array<{name: string, value: any, type: string}>
 *   }>,
 *   heapObjects: Array<{
 *     id: number,
 *     description: string,
 *     address: string,
 *     size: string
 *   }>,
 *   globals: Array<{name: string, value: any, type: string}>,
 *   consoleOutput: string,
 *   description: string
 * }>} steps
 */

const EXAMPLES = [
  {
    name: "Variables y asignación",
    state: {
      codeLines: [
        "# Ejemplo de variables y asignación",
        "a = 5",
        "b = 10",
        "c = a + b",
        "print(c)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 1,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'a' y se le asigna el valor entero 5.",
        },
        {
          lineIndex: 2,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'b' y se le asigna el valor entero 10.",
        },
        {
          lineIndex: 3,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
            {
              name: "c",
              value: 15,
              type: "int",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'c' y se le asigna el resultado de sumar 'a' y 'b', que es 15.",
        },
        {
          lineIndex: 4,
          stackFrames: [],
          heapObjects: [],
          globals: [
            {
              name: "a",
              value: 5,
              type: "int",
            },
            {
              name: "b",
              value: 10,
              type: "int",
            },
            {
              name: "c",
              value: 15,
              type: "int",
            },
          ],
          consoleOutput: "15",
          description: "Se imprime el valor de 'c' en la consola.",
        },
      ],
    },
  },
  {
    name: "Funciones y variables locales",
    state: {
      codeLines: [
        "# Ejemplo de funciones y variables locales",
        "def calcular_area(radio):",
        "    pi = 3.14159",
        "    return pi * radio * radio",
        "",
        "nombre = 'Estudiante'",
        "lista_numeros = [1, 2, 3]",
        "area = calcular_area(5)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 5,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'nombre' y se le asigna un string que se almacena en el heap.",
        },
        {
          lineIndex: 6,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_numeros' y se le asigna una lista que se almacena en el heap.",
        },
        {
          lineIndex: 7,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se llama a la función 'calcular_area' con el argumento radio=5. Se crea un nuevo frame en la pila.",
        },
        {
          lineIndex: 2,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
                {
                  name: "pi",
                  value: 3.14159,
                  type: "float",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable local 'pi' en el frame de 'calcular_area'.",
        },
        {
          lineIndex: 3,
          stackFrames: [
            {
              functionName: "calcular_area",
              variables: [
                {
                  name: "radio",
                  value: 5,
                  type: "int",
                },
                {
                  name: "pi",
                  value: 3.14159,
                  type: "float",
                },
              ],
            },
          ],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se calcula el valor de retorno: pi * radio * radio = 3.14159 * 5 * 5 = 78.53975.",
        },
        {
          lineIndex: 7,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "String: 'Estudiante'",
              address: "0x1000",
              size: "10 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3]",
              address: "0x2000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "nombre",
              value: "0x1000",
              type: "str",
            },
            {
              name: "lista_numeros",
              value: "0x2000",
              type: "list",
            },
            {
              name: "area",
              value: 78.53975,
              type: "float",
            },
          ],
          consoleOutput: "",
          description:
            "La función 'calcular_area' retorna el valor 78.53975 que se asigna a la variable global 'area'. El frame de la función se elimina de la pila.",
        },
      ],
    },
  },
  {
    name: "Referencias y mutabilidad",
    state: {
      codeLines: [
        "# Ejemplo de referencias y mutabilidad",
        "lista_a = [1, 2, 3]",
        "lista_b = lista_a",
        "lista_b.append(4)",
        "print(lista_a)",
        "",
        "# Creando una copia",
        "lista_c = lista_a.copy()",
        "lista_c.append(5)",
        "print(lista_a)",
        "print(lista_c)",
      ],
      steps: [
        {
          lineIndex: 0,
          stackFrames: [],
          heapObjects: [],
          globals: [],
          consoleOutput: "",
          description:
            "Inicio del programa. Aún no se ha ejecutado ninguna línea de código.",
        },
        {
          lineIndex: 1,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3]",
              address: "0x1000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_a' y se le asigna una lista [1, 2, 3] que se almacena en el heap.",
        },
        {
          lineIndex: 2,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3]",
              address: "0x1000",
              size: "24 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se crea la variable global 'lista_b' y se le asigna la misma referencia que 'lista_a'. Ambas variables apuntan al mismo objeto en memoria.",
        },
        {
          lineIndex: 3,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "",
          description:
            "Se modifica la lista a través de 'lista_b' añadiendo el valor 4. Como 'lista_a' y 'lista_b' apuntan al mismo objeto, ambas variables ven el cambio.",
        },
        {
          lineIndex: 4,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se imprime 'lista_a', mostrando que contiene [1, 2, 3, 4] aunque el elemento 4 se añadió a través de 'lista_b'.",
        },
        {
          lineIndex: 7,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x2000",
              size: "32 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se crea la variable global 'lista_c' y se le asigna una copia de 'lista_a'. Ahora 'lista_c' apunta a un nuevo objeto en memoria con los mismos valores.",
        },
        {
          lineIndex: 8,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]",
          description:
            "Se modifica 'lista_c' añadiendo el valor 5. Como 'lista_c' es una copia, 'lista_a' y 'lista_b' no se ven afectadas por este cambio.",
        },
        {
          lineIndex: 9,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]\n[1, 2, 3, 4]",
          description:
            "Se imprime 'lista_a', que sigue conteniendo [1, 2, 3, 4].",
        },
        {
          lineIndex: 10,
          stackFrames: [],
          heapObjects: [
            {
              id: 1,
              description: "Lista: [1, 2, 3, 4]",
              address: "0x1000",
              size: "32 bytes",
            },
            {
              id: 2,
              description: "Lista: [1, 2, 3, 4, 5]",
              address: "0x2000",
              size: "40 bytes",
            },
          ],
          globals: [
            {
              name: "lista_a",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_b",
              value: "0x1000",
              type: "list",
            },
            {
              name: "lista_c",
              value: "0x2000",
              type: "list",
            },
          ],
          consoleOutput: "[1, 2, 3, 4]\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]",
          description:
            "Se imprime 'lista_c', que contiene [1, 2, 3, 4, 5]. Esto demuestra que 'lista_c' es independiente de 'lista_a' y 'lista_b'.",
        },
      ],
    },
  },
];

export default EXAMPLES;
