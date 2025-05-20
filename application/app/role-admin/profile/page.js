"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart2, Users, FileCode, Award, Settings } from "lucide-react";
import PromiseButton from "@/components/core/PromiseButton";

export default function AdminProfilePage() {
  const admin = {
    name: "Carlos Mendoza",
    role: "Administrador del Sistema",
    profile: "https://i.pravatar.cc/250?u=admin@example.com",
    bio: "Responsable de la supervisión y mantenimiento del sistema de aprendizaje. Administra cursos, usuarios y certificaciones.",
    stats: {
      totalUsers: 1245,
      activeCourses: 35,
      certificatesIssued: 220,
      pendingApprovals: 12,
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="md:flex p-6">
          <div className="md:w-1/4 flex justify-center md:justify-start">
            <div className="relative flex flex-col items-center">
              <div className="h-48 w-48 rounded-full overflow-hidden border-2 border-gray-400 shadow-lg">
                <img
                  src={admin.profile}
                  alt="Admin profile"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="mt-4">
                <PromiseButton loadingText="Guardando cambios...">
                  Editar Perfil
                </PromiseButton>
              </div>
              <div className="absolute bottom-16 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0e101e]" />
            </div>
          </div>

          <div className="md:w-3/4 mt-6 md:mt-0 md:pl-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">
                  {admin.name}
                </h1>
                <p className="text-gray-400">{admin.role}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-300">Sobre mí</h2>
              <p className="mt-2 text-gray-400">{admin.bio}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-700 rounded-lg">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="flex overflow-x-auto w-full p-0 h-auto">
              <TabsTrigger value="dashboard" className="tab-btn">
                <BarChart2 size={18} className="mr-2" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="tab-btn">
                <Users size={18} className="mr-2" /> Usuarios
              </TabsTrigger>
              <TabsTrigger value="courses" className="tab-btn">
                <FileCode size={18} className="mr-2" /> Cursos
              </TabsTrigger>
              <TabsTrigger value="certificates" className="tab-btn">
                <Award size={18} className="mr-2" /> Certificados
              </TabsTrigger>
              <TabsTrigger value="settings" className="tab-btn">
                <Settings size={18} className="mr-2" /> Configuración
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="dashboard">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">
                  Resumen General
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    label="Usuarios Registrados"
                    value={admin.stats.totalUsers}
                  />
                  <StatCard
                    label="Cursos Activos"
                    value={admin.stats.activeCourses}
                  />
                  <StatCard
                    label="Certificados Emitidos"
                    value={admin.stats.certificatesIssued}
                  />
                  <StatCard
                    label="Aprobaciones Pendientes"
                    value={admin.stats.pendingApprovals}
                  />
                </div>
              </TabsContent>

              <TabsContent value="users">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Gestión de Usuarios
                </h3>
                <p className="text-gray-400">
                  Aquí se mostrarán los usuarios registrados. (Funcionalidad
                  pendiente)
                </p>
              </TabsContent>

              <TabsContent value="courses">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Gestión de Cursos
                </h3>
                <p className="text-gray-400">
                  Aquí se podrán editar, activar o eliminar cursos.
                  (Funcionalidad pendiente)
                </p>
              </TabsContent>

              <TabsContent value="certificates">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Certificados Emitidos
                </h3>
                <p className="text-gray-400">
                  Lista de certificados emitidos a usuarios. (Funcionalidad
                  pendiente)
                </p>
              </TabsContent>

              <TabsContent value="settings">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Configuración General
                </h3>
                <p className="text-gray-400">
                  Opciones de configuración para el sistema. (Funcionalidad
                  pendiente)
                </p>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Componente para tarjetas de estadísticas
function StatCard({ label, value }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h4 className="text-gray-400 text-sm">{label}</h4>
      <p className="text-2xl font-bold text-indigo-400">{value}</p>
    </div>
  );
}
