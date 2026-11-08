"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "./SocialButtons";

const SignInForm = ({ redirectTo }: { redirectTo?: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // সুরক্ষিত পেজ থেকে এলে টোস্ট দেখাবে
  useEffect(() => {
    if (redirectTo) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [redirectTo]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    if (!user.email || !user.password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      ...user,
    });
    setLoading(false);

    if (data) {
      toast.success("সাইন ইন সফল হয়েছে!");
      router.push(redirectTo || "/");
      router.refresh();
    }

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold">সাইন ইন</h2>
      <p className="mt-2 text-center text-sm text-neutral-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="mt-6 w-full max-w-md rounded-2xl border border-gray-200 bg-card p-6">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset">
            <label className="label text-sm font-medium text-neutral-800">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="you@example.com"
            />

            <label className="label mt-2 text-sm font-medium text-neutral-800">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              className="input w-full"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn mt-4 w-full border-0 bg-brand text-white shadow-md hover:bg-brand-dark"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
            </button>
          </fieldset>
        </form>

        <div className="divider my-3 text-xs text-neutral-500">অথবা</div>

        <SocialButtons callbackURL={redirectTo || "/"} />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-brand">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-neutral-500 hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignInForm;
