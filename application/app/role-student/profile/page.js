"use client";
import PromiseButton from "@/components/core/PromiseButton";
import { Code, BookOpen, FileCode, Award } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkillsPage from "./skills/page";
import Certificates from "./certificates/page";
import ProjectsPage from "./projects/page";
import Courses from "./your_courses/page";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [student, setStudent] = useState({
    profile: "",
    username: "", 
    role: "",
    bio: "",
    email: "", 
    status: "inactive", 
  });

  useEffect(() => {
    const storedStudent = localStorage.getItem("user");
    if (storedStudent) {
      try {
        const parsedStudent = JSON.parse(storedStudent);
        setStudent(prevStudent => ({
          ...prevStudent, 
          ...parsedStudent, 
          username: parsedStudent.username || parsedStudent.name || prevStudent.username,
        }));
      } catch (error) {
        console.error("Error al parsear los datos del estudiante:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="md:flex p-6">
          <div className="md:w-1/4 flex justify-center md:justify-start">
            <div className="relative flex flex-col items-center">
              <div className="h-48 w-48 rounded-full overflow-hidden border-2 border-gray-400 shadow-lg">
                <img
                  src={student.profile || "https://i.pinimg.com/736x/4f/f6/6d/4ff66d0783159436583bd3be5eaf91e2.jpg"}
                  alt="Foto de perfil"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="mt-4">
                <PromiseButton loadingText="Iniciando sesión...">
                  Editar perfil
                </PromiseButton>
              </div>
              {student.status === "active" &&
                <div className="absolute bottom-16 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0e101e]"></div>
              }
            </div>
          </div>

          <div className="md:w-3/4 mt-6 md:mt-0 md:pl-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">
                  {student.username || "Nombre de Usuario"}
                </h1>
                <p className="text-gray-400">{student.role || "Rol del estudiante"}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-300">Sobre mí</h2>
              <p className="mt-2 text-gray-400">{student.bio || "Biografía no disponible."}</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-700 rounded-lg">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="flex overflow-x-auto w-full p-0 h-auto">
              <TabsTrigger
                value="info"
                className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <BookOpen size={18} className="mr-2" /> Información
              </TabsTrigger>
              <TabsTrigger
                value="courses"
                className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <FileCode size={18} className="mr-2" /> Cursos
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Code size={18} className="mr-2" /> Proyectos
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="px-6 py-3 text-sm font-medium flex items-center data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-400 text-gray-400 hover:text-gray-300 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Award size={18} className="mr-2" /> Certificados
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="info" className="m-0">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Habilidades
                </h3>
                <SkillsPage />
              </TabsContent>

              <TabsContent value="courses" className="m-0">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Mis Cursos
                </h3>
                <Courses />
              </TabsContent>

              <TabsContent value="projects" className="m-0">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Mis Proyectos
                </h3>
                <ProjectsPage />
              </TabsContent>

              <TabsContent value="certificates" className="m-0">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Mis Certificados
                </h3>
                <Certificates />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}