"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "./SocialButtons";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (!user.name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (user.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি");
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setLoading(false);

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
      router.push("/signin");
    }

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
      <p className="mt-2 text-center text-sm text-neutral-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="mt-6 w-full max-w-md rounded-2xl border border-gray-200 bg-card p-6">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset">
            <label className="label text-sm font-medium text-neutral-800">
              নাম
            </label>
            <input
              name="name"
              type="text"
              className="input w-full"
              placeholder="যেমন: রহিম উদ্দিন"
            />

            <label className="label mt-2 text-sm font-medium text-neutral-800">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
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

            <label className="label mt-2 text-sm font-medium text-neutral-800">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="input w-full"
              placeholder="আবার লিখুন"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn mt-4 w-full border-0 bg-brand text-white shadow-md hover:bg-brand-dark"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </fieldset>
        </form>

        <div className="divider my-3 text-xs text-neutral-500">অথবা</div>

        <SocialButtons callbackURL="/" />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-brand">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-neutral-500 hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpForm;
