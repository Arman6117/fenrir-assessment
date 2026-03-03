import cn from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger"
}

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary:
      "bg-[#0CC8A8] hover:bg-[#0bb39a] text-white rounded-lg px-4 py-3 focus:ring-[#0CC8A8]",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-3 focus:ring-gray-300",
    ghost:
      "text-gray-700 hover:bg-gray-100 rounded-lg px-4 py-3 focus:ring-gray-200",
    danger:
      "bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3 focus:ring-red-500",
  }

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button