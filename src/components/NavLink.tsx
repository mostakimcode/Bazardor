"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? "bg-brand text-white"
          : "text-neutral-700 hover:bg-green-50 hover:text-brand"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
