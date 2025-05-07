"use client";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import { useRouter, useSearchParams} from "next/navigation";


export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const router = useRouter();

  const validations = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const getStrength = () => {
    const passed = Object.values(validations).filter(Boolean).length;
    return (passed / Object.keys(validations).length) * 100;
  };

  const handleLogin = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const allValid = Object.values(validations).every(Boolean);
    if (!allValid) {
      setError("La contraseña no cumple con todos los requisitos.");
      return;
    }
    setError("");
    await fetch("http://localhost:8006/auth/password-reset/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: {token},
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error al restablecer la contraseña.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
    })
    router.push("/home?login=true");
  };

  const indicatorColor = () => {
    const strength = getStrength();
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!token) {
    return (
      <div className="w-full max-w-sm mx-auto relative z-50">
        <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl p-8">
          <h2 className="text-xl font-medium text-light-1 text-center mb-6">
            Error
          </h2>
          <p className="text-sm text-center pb-3">
            No se ha proporcionado un token de restablecimiento de contraseña.
          </p>
        </div>
      </div>
    );
  }

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
            <div className="w-full h-2 rounded bg-neutral-700">
              <div
                className={`h-full rounded ${indicatorColor()}`}
                style={{ width: `${getStrength()}%` }}
              ></div>
            </div>
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
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>

          <ul className="text-xs space-y-1 text-light-3 pt-2">
            <li className={validations.length ? "text-green-400" : ""}>
              ✔ Al menos 8 caracteres
            </li>
            <li className={validations.lowercase ? "text-green-400" : ""}>
              ✔ Una letra minúscula
            </li>
            <li className={validations.uppercase ? "text-green-400" : ""}>
              ✔ Una letra mayúscula
            </li>
            <li className={validations.number ? "text-green-400" : ""}>
              ✔ Un número
            </li>
            <li className={validations.special ? "text-green-400" : ""}>
              ✔ Un símbolo o carácter especial
            </li>
          </ul>

          <PromiseButton
            onClick={handleLogin}
            className="w-full"
            loadingText="Redirigiendo sesión..."
          >
            Continuar
          </PromiseButton>
        </div>
      </div>
    </div>
  );
}
