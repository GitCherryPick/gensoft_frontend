"use client";
import { useState, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/navigation";

export default function PasswordRecovery({ onBack }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmailDomain = (email) => {
    const allowedDomain = "@est.umss.edu";
    return email.endsWith(allowedDomain);
  };

  const handleSig = async () => {
    if (!validateEmailDomain(email)) {
      setError("Por favor, utiliza tu correo institucional (@est.umss.edu)");
      return;
    }
    setError("");
    const { API_BASE_URL } = require('@/lib/users/api-config');
    await fetch(`${API_BASE_URL}/auth/password-reset/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error al enviar el correo de recuperación.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
    router.push(ROUTES.RECOVER_PASSWORD.NOTIFY_RECOVER);
  };

  const handleLogin = async () => {
    router.push("/home?login=true");
  };

  return (
    <div className="w-full max-w-sm mx-auto relative z-50">
      <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl p-8">
        <div className="mb-6 flex justify-start">
          <button
            onClick={handleLogin}
            className="text-light-3 hover:text-light-1 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Volver</span>
          </button>
        </div>

        <h2 className="text-xl font-medium text-light-1 text-center mb-6">
          Recuperar Contraseña
        </h2>

        <p className="text-sm text-center pb-3">
          Introduzca su dirección de correo electrónico
        </p>

        <div className="space-y-5">
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              className="bg-transparent border-neutral-700/50 focus:border-blue-500/50"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <PromiseButton
            onClick={handleSig}
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
