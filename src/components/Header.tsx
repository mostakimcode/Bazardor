import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-brand">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={22}
              height={22}
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight">বাজার দর</span>
            <span className="text-xs text-neutral-500">{date}</span>
          </div>
        </Link>

        <UserInfo />
      </div>

      <div className="border-t border-gray-200">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
