"use client";
import { useState, useEffect } from "react";
import { User, Lock, ArrowLeft } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function ComponentFormLoginCard({ onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, isLoading } = useAuth();

  useEffect(() => {
    router.prefetch(ROUTES.STUDENT.ROOT);
    router.prefetch(ROUTES.ADMIN.ROOT);
    router.prefetch(ROUTES.TEACHER.ROOT);
  }, [router]);

  const handleLogin = async () => {
    try {
      const user = await login({ username, password });

      if (user.role === "student") {
        router.push(ROUTES.STUDENT.ROOT);
      } else if (user.role === "admin") {
        router.push(ROUTES.ADMIN.ROOT);
      } else if (user.role === "teacher") {
        router.push(ROUTES.TEACHER.ROOT);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto relative z-50">
      <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl p-8">
        <div className="mb-6 flex justify-start">
          <button
            onClick={onBack}
            className="text-light-3 hover:text-light-1 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Volver</span>
          </button>
        </div>

        <h2 className="text-xl font-medium text-light-1 text-center mb-6">
          Iniciar Sesión
        </h2>

        <div className="space-y-5">
          <div className="space-y-3">
            <Input
              type="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={User}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />

            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              secure={true}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />

            <div className="text-left mt-1">
              <Link
                href={ROUTES.RECOVER_PASSWORD.ROOT}
                className="text-variant-3 text-xs hover:text-light-1 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <PromiseButton
            onClick={handleLogin}
            className="w-full"
            loadingText="Iniciando sesión..."
          >
            Iniciar Sesión
          </PromiseButton>

          <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-neutral-700/50">
            <Link
              href={ROUTES.STUDENT.ROOT}
              prefetch={true}
              className="text-variant-3 text-xs hover:text-light-1 transition-colors"
            >
              Estudiante
            </Link>
            <Link
              href={ROUTES.ADMIN.ROOT}
              prefetch={true}
              className="text-variant-3 text-xs hover:text-light-1 transition-colors"
            >
              Admin
            </Link>
            <Link
              href={ROUTES.TEACHER.ROOT}
              prefetch={true}
              className="text-variant-3 text-xs hover:text-light-1 transition-colors"
            >
              Docente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
