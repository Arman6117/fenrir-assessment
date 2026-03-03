export default function AuthCard({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="w-full max-w-[450px] mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        {children}
      </div>
    )
  }