import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function InputField({
  label,
  className = "",
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full border border-gray-200 rounded-lg px-4 py-3 text-sm
        text-gray-700 placeholder:text-gray-400 outline-none
         focus:ring-1 focus:ring-primary-accent transition ${className}`}
        {...props}
      />
    </div>
  )
}