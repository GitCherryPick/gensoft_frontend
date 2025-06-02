"use client";

import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import ComponentFormLoginCard from "./PasswordReset";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function HomePasswordReset() {
  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      <div className="w-full min-h-screen flex items-center relative z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="w-full max-w-sm mx-auto relative z-50">
                <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl p-8">
                  <p className="text-center text-light-1">Cargando...</p>
                </div>
              </div>
            }>
              <ComponentFormLoginCard />
            </Suspense>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}