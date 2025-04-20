"use client"
import { useState, useEffect } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { IconBrain, IconUser, IconSettings, IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { ROUTES } from "@/lib/navigation"

export default function StudentLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const links = [
    {
      label: "Problemas",
      href: ROUTES.STUDENT.PROBLEMS,
      icon: <IconBrain className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Perfil",
      href: ROUTES.STUDENT.PROFILE,
      icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Configuraciones",
      href: ROUTES.STUDENT.SETTINGS,
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Cerrar Sesión",
      href: ROUTES.HOME,
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ]

  useEffect(() => {
    if (pathname === ROUTES.STUDENT.ROOT) {
      router.push(ROUTES.STUDENT.PROBLEMS)
    }
  }, [pathname, router])

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen",
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
                    pathname === link.href ? "bg-gray-100 text-neutral-900 dark:bg-neutral-800 dark:text-white" : ""
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Estudiante",
                href: ROUTES.STUDENT.PROFILE,
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs">E</span>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <Link
      href={ROUTES.STUDENT.ROOT}
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Portal Estudiante
      </motion.span>
    </Link>
  )
}
