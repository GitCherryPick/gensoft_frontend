import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold">Admin</h1>
        </CardContent>
      </Card>
    </div>
  )
}

