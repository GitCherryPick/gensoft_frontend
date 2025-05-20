"use client";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/lib/auth/auth-context";
import ComponentFormRegisterCard from "@/app/home/ComponentFormRegisterCard";

export default function SignupPage() {
  const router = useRouter();
  return (
    <AuthProvider>
      <ComponentFormRegisterCard onBack={() => router.back()} />
    </AuthProvider>
  );
}