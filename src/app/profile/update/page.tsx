"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    if (!newUserData.name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: newUserData.name.trim(),
    });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="skeleton h-8 w-56"></div>
        <div className="skeleton mt-6 h-56 w-full rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-neutral-500">
        আপনার নতুন নাম লিখে সংরক্ষণ করুন।
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 sm:p-6">
        <form onSubmit={handleUpdateProfile}>
          <fieldset className="fieldset">
            <label className="label text-sm font-medium text-neutral-800">
              নাম
            </label>
            <input
              name="name"
              type="text"
              defaultValue={user?.name}
              className="input w-full"
              placeholder="আপনার নাম"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn mt-4 w-full border-0 bg-brand text-white shadow-md hover:bg-brand-dark"
            >
              {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
            </button>
          </fieldset>
        </form>
      </div>

      <Link
        href="/profile"
        className="mt-5 inline-block text-sm text-neutral-500 hover:text-brand"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
};

export default UpdateProfilePage;
