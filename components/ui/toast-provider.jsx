"use client"
import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "var(--color-dark-2)",
          color: "var(--color-light-1)",
          border: "1px solid var(--color-light-3)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-cta-1)",
            secondary: "black",
          },
        },
      }}
    />
  )
}
