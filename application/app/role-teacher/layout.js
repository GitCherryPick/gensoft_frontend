"use client";

import { useState, useEffect } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { IconArrowLeft, IconBook, IconUser, IconFlask, IconCopy, IconChecklist, IconFileCertificate } from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { ROUTES } from "@/lib/navigation"

export default function TeacherLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const links = [
    {
      label: "Perfil",
      href: ROUTES.TEACHER.PROFILE,
      icon: (
        <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Modulos",
      href: ROUTES.TEACHER.CONTENT,
      icon: (
        <IconBook className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Laboratorios",
      href: ROUTES.TEACHER.EXERCISES,
      icon: <IconFlask className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Replicas",
      href: ROUTES.TEACHER.TASKS,
      icon: (
        <IconCopy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Revisión Tareas",
      href: ROUTES.TEACHER.REVIEW_LABS,
      icon: <IconChecklist className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Examenes",
      href: ROUTES.TEACHER.EXAMS,
      icon: (
        <IconBook className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Cerrar Sesión",
      href: ROUTES.HOME,
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  useEffect(() => {
    if (pathname === ROUTES.TEACHER.ROOT) {
      router.push(ROUTES.TEACHER.PROFILE);
    }
  }, [pathname, router]);

  // Efecto para cerrar el sidebar después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-50 md:flex-row dark:border-neutral-700 dark:bg-dark-1",
        "md:h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={
                    pathname === link.href
                      ? "bg-gray-50 text-neutral-900 font-semibold dark:bg-dark-2 dark:text-white"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-1 md:p-5 dark:border-neutral-700 dark:bg-dark-1">
          {children}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href={ROUTES.TEACHER.ROOT}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Portal Docente
      </motion.span>
    </Link>
  );
};
