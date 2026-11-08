"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="skeleton h-8 w-48"></div>
        <div className="skeleton mt-6 h-28 w-full rounded-2xl"></div>
        <div className="skeleton mt-6 h-56 w-full rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-neutral-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              alt={user.name}
              src={user.image}
              className="size-20 rounded-xl object-cover"
            />
          ) : (
            <div className="grid size-20 place-items-center rounded-xl bg-brand text-3xl font-semibold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-neutral-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignout}
          className="btn btn-outline btn-sm border-red-500 text-red-600 hover:border-red-500 hover:bg-red-500 hover:text-white sm:btn-md"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 sm:p-6">
        <h2 className="text-lg font-bold">তথ্য</h2>

        <fieldset className="fieldset mt-4">
          <label className="label text-sm font-medium text-neutral-800">
            নাম
          </label>
          <input
            type="text"
            readOnly
            value={user?.name ?? ""}
            className="input w-full"
          />

          <Link href="/profile/update">
            <button className="btn mt-4 w-full border-0 bg-brand text-white shadow-md hover:bg-brand-dark">
              আপডেট
            </button>
          </Link>
        </fieldset>
      </div>
    </div>
  );
};

export default ProfilePage;
