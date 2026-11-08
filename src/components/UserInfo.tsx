"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // মেনুর বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignout = async () => {
    await authClient.signOut();
    setOpen(false);
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="skeleton size-9 rounded-full"></div>
        <div className="skeleton hidden h-4 w-16 sm:block"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin">
          <button className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-sm border-0 bg-brand text-white shadow-md hover:bg-brand-dark sm:btn-md">
            সাইন আপ
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-green-50"
      >
        {user.image ? (
          <img
            alt={user.name}
            src={user.image}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <div className="grid size-9 place-items-center rounded-full bg-brand font-semibold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden text-sm font-medium sm:block">
          {user.name?.split(" ")[0]}
        </span>
        <span className="text-[10px] text-neutral-400">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-card p-4 shadow-lg">
          <p className="font-semibold">{user.name}</p>
          <p className="mb-3 truncate text-xs text-neutral-500">{user.email}</p>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-2 py-2 text-sm hover:bg-green-50"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            onClick={handleSignout}
            className="block w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
