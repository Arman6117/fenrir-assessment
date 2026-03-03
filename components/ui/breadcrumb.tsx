import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  prefix?: string;
  items: BreadcrumbItem[];
}

export function Breadcrumb({ prefix, items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      {prefix && (
        <span className="font-semibold text-gray-900 mr-1">{prefix}</span>
      )}
      <Link href="/">
        <Home className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          {item.href && !item.active ? (
            <Link href={item.href} className="text-gray-500 hover:text-gray-700 transition">
              {item.label}
            </Link>
          ) : (
            <span className={item.active ? "text-[#0D9488] font-medium" : "text-gray-500"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
