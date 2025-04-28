"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function EmptyState({ className, imageSize = 400 }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="/images/placeholder-illustration.svg"
        alt="Placeholder"
        width={imageSize}
        height={imageSize}
        priority
      />
    </div>
  )
}
