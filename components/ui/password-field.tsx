"use client"

import { useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"

type Props = {
  label?: string
  placeholder?: string
}

export default function PasswordField({ label, placeholder }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm
          text-gray-700 placeholder:text-gray-400 outline-none
           focus:ring-1 focus:ring-primary-accent transition pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <BsEye size={16} /> : <BsEyeSlash size={16} />}
        </button>
      </div>
    </div>
  )
}