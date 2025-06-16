"use client";

import { useState, useEffect } from "react";
import { Camera, Code, User, BookOpen, FileCode } from "lucide-react";
import PromiseButton from "@/components/core/PromiseButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import SkillsPage from "./skills/page";
import PersonalInfoPage from "./InformationStudent/page";
import ProjectsPage from "./projects/page";
import Courses from "./your_courses/page";
import { getUserById, alive } from "@/lib/users/users-service";
import { getCurrentUser } from "@/lib/auth/auth-service";

function ProfileHeader({ user }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const initialLetter = user.name?.charAt(0).toUpperCase();

  return (
    <div className="bg-[#0e101e] rounded-lg p-4 mb-4 shadow-md relative border border-gray-800">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div
          className="relative group w-[120px] h-[120px] rounded-full border-2 border-gray-700 shadow-sm bg-green-600 flex items-center justify-center cursor-default select-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="text-white text-4xl font-bold">
            {initialLetter}
          </span>
          <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center text-white">
              <Camera size={20} className="mx-auto mb-1" />
              <span className="text-xs font-semibold">Sin foto</span>
            </div>
          </div>
          {isOnline && (
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border border-gray-800 animate-pulse-slow"></div>
          )}
        </div>
        <div className="flex-1 text-left space-y-1">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-sm text-gray-300 font-medium">{user.role}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage({ userId: propUserId }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

  const userId = currentUser?.id || propUserId;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError("User ID no se encuentra.");
        setLoading(false);
        return;
      }

      try {
        const aliveResponse = await alive();
        if (!aliveResponse) {
          throw new Error("El backend no está respondiendo");
        }

        const userData = await getUserById(userId);
        setStudent({
          profile: userData.profile || "",
          name: userData.full_name || "Usuario desconocido",
          role: userData.status || "Estudiante",
          email: userData.email || "correo@ejemplo.com"
        });
      } catch (err) {
        setError(err.message || "Error al obtener datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  if (loading || !currentUser) {
    return <div className="text-center p-6 text-gray-100">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {student && <ProfileHeader user={student} />}
        <div className="border border-gray-700 rounded-lg mt-4 mb-6 bg-gray-800">
          <Tabs defaultValue="infoper" className="w-full">
            <div className="border-b border-gray-700 bg-gray-800 sticky top-0 z-20">
              <ScrollArea className="w-full" orientation="horizontal">
                <TabsList className="flex w-max p-0 h-auto bg-transparent justify-center">
                  <TabsTrigger value="infoper" className="px-4 py-2 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-200 transition-colors rounded-none bg-transparent whitespace-nowrap">
                    <User size={16} className="mr-1.5" /> Información personal
                  </TabsTrigger>
                  <TabsTrigger value="info" className="px-4 py-2 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-200 transition-colors rounded-none bg-transparent whitespace-nowrap">
                    <BookOpen size={16} className="mr-1.5" /> Habilidades
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="px-4 py-2 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-200 transition-colors rounded-none bg-transparent whitespace-nowrap">
                    <FileCode size={16} className="mr-1.5" /> Cursos
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="px-4 py-2 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-200 transition-colors rounded-none bg-transparent whitespace-nowrap">
                    <Code size={16} className="mr-1.5" /> Proyectos
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>
            </div>

            <ScrollArea className="h-[calc(100vh-280px)] sm:h-[calc(100vh-240px)]">
              <div className="p-4 sm:p-6">
                <TabsContent value="infoper">
                  <PersonalInfoPage userId={userId} />
                </TabsContent>
                <TabsContent value="info">
                  <h3 className="text-base font-semibold text-gray-300 mb-3">Habilidades</h3>
                  <SkillsPage userId={userId} />
                </TabsContent>
                <TabsContent value="courses">
                  <h3 className="text-base font-semibold text-gray-300 mb-3">Mis Cursos</h3>
                  <Courses userId={userId} />
                </TabsContent>
                <TabsContent value="projects">
                  <h3 className="text-base font-semibold text-gray-300 mb-3">Mis Proyectos</h3>
                  <ProjectsPage userId={userId} />
                </TabsContent>
                <div className="h-6"></div>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
