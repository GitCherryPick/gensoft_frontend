import "./globals.css"
import StyleGuideButton from "./design-system/StyleGuideButton"
import RoutePrefetcher from "@/components/RoutePrefetcher"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AuthProvider } from "@/lib/auth/auth-context"

export const metadata = {
  title: "Pythonidae",
  description: "Plataforma interactiva para aprender Python desde cero, con ejercicios prácticos y retroalimentación automática",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <ToastProvider />
          {children}
          <StyleGuideButton />
          <RoutePrefetcher />
        </AuthProvider>
      </body>
    </html>
  )
}
