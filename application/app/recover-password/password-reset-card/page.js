"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ComponentFormLoginCard from "../password-reset-card/PasswordReset";

import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

export default function PasswordReset() {
  const [showLoginCard, setShowLoginCard] = useState(false);

  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      <div className="w-full min-h-screen flex items-center relative z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <ComponentFormLoginCard onBack={() => setShowLoginCard(false)} />
          </AnimatePresence>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Link href={ROUTES.STUDENT.ROOT} prefetch={true} />
        <Link href={ROUTES.STUDENT.COURSES} prefetch={true} />
        <Link href={ROUTES.ADMIN.ROOT} prefetch={true} />
        <Link href={ROUTES.ADMIN.USERS} prefetch={true} />
        <Link href={ROUTES.TEACHER.ROOT} prefetch={true} />
        <Link href={ROUTES.TEACHER.TASKS} prefetch={true} />
      </div>
    </div>
  );
}
