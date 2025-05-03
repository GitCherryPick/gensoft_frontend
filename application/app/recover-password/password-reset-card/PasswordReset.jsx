"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/navigation";

export default function PasswordReset({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.STUDENT.ROOT);
    router.prefetch(ROUTES.ADMIN.ROOT);
    router.prefetch(ROUTES.TEACHER.ROOT);
  }, [router]);

  const handleLogin = async () => {
    router.push(ROUTES.HOME);
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
          Reestablecer Contraseña
        </h2>

        <p className="text-sm text-center pb-3">
          Por favor, ingresa y confirma tu nueva contraseña para completar el
          proceso de restablecimiento.
        </p>

        <div className="space-y-5">
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setEmail(e.target.value)}
              icon={Lock}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />
          </div>
          <div className="space-y-3">
            <Input
              type="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setEmail(e.target.value)}
              icon={Lock}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />
          </div>

          <PromiseButton
            onClick={handleLogin}
            className="w-full"
            loadingText="Iniciando sesión..."
          >
            Continuar
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
