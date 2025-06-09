"use client";

import { useState, useEffect } from "react";
import { User, Mail, UserPlus, Lock, ArrowLeft } from "lucide-react";
import Input from "@/components/core/Input";
import PromiseButton from "@/components/core/PromiseButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function ComponentFormRegisterCard({ onBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("estudiante")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { signup, isLoading } = useAuth();

  useEffect(() => {
    router.prefetch(ROUTES.HOME);
  }, [router]);

  const handleRegister = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const newUser = await signup({
        username,
        email,
        full_name: fullName,
        password,
        role: rolSeleccionado
      });
      router.push(ROUTES.HOME);
    } catch (err) {
      console.error("Registration error:", err);
      setError("Error al registrar. Ver consola para más detalles.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1 px-4">
      <div className="w-full max-w-md bg-dark-2 border border-neutral-700 rounded-2xl shadow-xl p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-light-3 hover:text-light-1 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Volver</span>
        </button>

        <h2 className="text-2xl font-semibold text-light-1 text-center mb-4">
          Regístrate
        </h2>

        <Tabs defaultValue="estudiante" onValueChange={setRolSeleccionado}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="estudiante" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md">
              Estudiante
            </TabsTrigger>
            <TabsTrigger value="docente" className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md">
              Docente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estudiante">
            <p className="text-sm text-muted-foreground mb-4">
              Regístrate como estudiante.
            </p>
          </TabsContent>
          <TabsContent value="docente">
            <p className="text-sm text-muted-foreground mb-4">
              Regístrate como docente.
            </p>
          </TabsContent>
        </Tabs>
        <input type="hidden" name="role" value={rolSeleccionado} />
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={UserPlus}
            className="w-full bg-transparent border-neutral-700/50 focus:border-blue-500/50"
          />

          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            className="w-full bg-transparent border-neutral-700/50 focus:border-blue-500/50"
          />

          <Input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={User}
            className="w-full bg-transparent border-neutral-700/50 focus:border-blue-500/50"
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            secure
            className="w-full bg-transparent border-neutral-700/50 focus:border-blue-500/50"
          />

          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
            secure
            className="w-full bg-transparent border-neutral-700/50 focus:border-blue-500/50"
          />

          {error && <div className="text-red-500 text-xs">{error}</div>}

          <PromiseButton
            onClick={handleRegister}
            className="w-full py-3 rounded-xl font-medium"
            loadingText="Registrando..."
            disabled={isLoading}
          >
            Crear Cuenta
          </PromiseButton>
        </div>

        <div className="mt-6 text-center text-xs">
          <span className="text-variant-3">¿Ya tienes cuenta?</span>{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-blue-400 hover:underline transition-colors"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
