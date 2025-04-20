import { cn } from "@/lib/utils"

export default function Input({ type = "text", placeholder = "Enter text...", className, label, error, ...props }) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-light-2">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-neutral-700 bg-transparent px-4 py-2 text-light-1 placeholder-light-3 focus:border-light-3 focus:outline-none focus:ring-1 focus:ring-light-3",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
