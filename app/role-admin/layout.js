import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Portal</h1>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Logout
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}

