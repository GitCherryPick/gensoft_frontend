"use client"

import MarkdownEditorWithPreview from "@/components/core/markdown-editor-with-preview"

export default function ContentPage() {
  const initialContent = `# Guía de Markdown

Bienvenido al editor de contenido. Aquí puedes crear y editar el contenido educativo usando Markdown.

## Elementos básicos

### Títulos

Los títulos se crean con el símbolo # seguido de un espacio. Más # significan niveles inferiores de títulos.

### Formato de texto

Puedes hacer texto en **negrita** usando dos asteriscos o __guiones bajos__.

El texto en *cursiva* se crea con un asterisco o _guion bajo_.

### Listas

Lista no ordenada:
- Elemento 1
- Elemento 2
- Elemento 3

Lista ordenada:
1. Primer elemento
2. Segundo elemento
3. Tercer elemento

### Bloques de código

\`\`\`python
def saludar(nombre):
    print(f"Hola, {nombre}!")
    
saludar("Estudiante")
\`\`\`

### Citas

> Las citas se crean con el símbolo mayor que al inicio de la línea.
> Puedes continuar la cita en múltiples líneas.

### Enlaces

[Texto del enlace](https://ejemplo.com)

---

Puedes editar este contenido para crear tus propios materiales educativos.
`

  return (
    <div className="h-full w-full">
      <MarkdownEditorWithPreview initialContent={initialContent} />
    </div>
  )
}
