"use client";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import { useRouter } from "next/navigation";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/home?login=true");
  };

  return (
    <div className="w-full max-w-sm mx-auto relative z-50">
      <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl p-8">
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
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              secure={true}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />
          </div>
          <div className="space-y-3">
            <Input
              type="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              secure={true}
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
        </div>
      </div>
    </div>
  );
}
