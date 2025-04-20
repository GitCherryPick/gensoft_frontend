import "./globals.css"
import StyleGuideButton from "./design-system/StyleGuideButton"

export const metadata = {
  title: "Role-Based System",
  description: "Simple role-based navigation system",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <StyleGuideButton />
      </body>
    </html>
  )
}
