"use client";
import { AnimatePresence } from "framer-motion";
import PasswordRecovery from "../recover-password/recovery-password-card/PasswordRecovery";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function HomeRecoveryPassword() {
  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      <div className="w-full min-h-screen flex items-center relative z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <PasswordRecovery />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
