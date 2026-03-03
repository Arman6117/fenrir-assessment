import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export default function SocialButton({
  children,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      className={`flex-1 flex items-center justify-center gap-2 
      text-sm font-medium py-3 rounded-full transition ${className}`}
    >
      {children}
    </button>
  )
}