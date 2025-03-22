import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/role-student" className="w-full">
            <Button variant="outline" className="w-full">
              Estudiante
            </Button>
          </Link>
          <Link href="/role-admin" className="w-full">
            <Button variant="outline" className="w-full">
              Admin
            </Button>
          </Link>
          <Link href="/role-teacher" className="w-full">
            <Button variant="outline" className="w-full">
              Docente
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

