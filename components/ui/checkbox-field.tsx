type Props = {
    id: string
    children: React.ReactNode
  }
  
  export default function CheckboxField({ id, children }: Props) {
    return (
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id={id}
          className="mt-0.5 accent-primary-accent w-4 h-4 rounded cursor-pointer"
        />
        <label
          htmlFor={id}
          className="text-xs text-gray-500 leading-relaxed"
        >
          {children}
        </label>
      </div>
    )
  }