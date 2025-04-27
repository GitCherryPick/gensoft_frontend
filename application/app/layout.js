import "./globals.css"
import StyleGuideButton from "./design-system/StyleGuideButton"
import RoutePrefetcher from "@/components/RoutePrefetcher"
import { ToastProvider } from "@/components/ui/toast-provider"
import { AuthProvider } from "@/lib/auth/auth-context"

export const metadata = {
  title: "Role-Based System",
  description: "Simple role-based navigation system",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
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
