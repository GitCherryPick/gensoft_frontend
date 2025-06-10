"use client";

import { Suspense } from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";
import HomeClientContent from "./HomeClientContent";
import { useEffect, useState } from "react";
import { alive } from "@/lib/users/users-service";

export default function HomePage() {

  const [isServerDown, setIsServerDown] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await alive();
        setIsServerDown(response === null);
      } catch (error) {
        setIsServerDown(true);
      } finally {
        setHasChecked(true);
      }
    };
    checkServerStatus();
  }, []);

  return (
    <div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
      {hasChecked && isServerDown && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
          El servidor se encuentra apagado
        </div>
      )}
      <div className="absolute inset-0 z-10">
        <Spotlight />
      </div>

      <div className="w-full min-h-screen flex items-center relative z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Suspense fallback={
            <div className="max-w-xl mx-0 lg:mx-12 xl:mx-24 2xl:mx-36 text-left">
            </div>
          }>
            <HomeClientContent />
          </Suspense>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Link href={ROUTES.STUDENT.ROOT} prefetch={true} />
        <Link href={ROUTES.STUDENT.COURSES} prefetch={true} />
        <Link href={ROUTES.ADMIN.ROOT} prefetch={true} />
        <Link href={ROUTES.ADMIN.USERS} prefetch={true} />
        <Link href={ROUTES.TEACHER.ROOT} prefetch={true} />
      </div>
    </div>
  );
}