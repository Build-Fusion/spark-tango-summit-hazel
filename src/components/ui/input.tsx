import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-fg",
        "placeholder:text-subtle shadow-none transition-[border-color,box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

export { Input };
