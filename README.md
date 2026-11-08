# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় নিত্যপণ্যের দৈনিক বাজারদর এক নজরে দেখার একটি Next.js ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক সর্বনিম্ন-সর্বাধিক-গড় দাম এক জায়গায় পাওয়া যায়।

## 🛠️ Technologies Used

- Next.js (App Router) + TypeScript
- Tailwind CSS + daisyUI
- Better Auth (Email/Password, Google, GitHub)
- MongoDB (Better Auth adapter)
- react-hot-toast
- react-marquee-text

## ✨ Key Features

1. **লাইভ প্রাইস টিকার** — নেভবারের নিচে অসীমভাবে ঘুরতে থাকা দামের স্ট্রিপ (▲/▼ পরিবর্তনসহ)
2. **আজ কোন পণ্যের দাম বাড়ল/কমল** — সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য, বাংলা অঙ্কে
3. **বাজারভিত্তিক বিস্তারিত দাম** — প্রতিটি পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় দাম (সুরক্ষিত পেজ)
4. **ক্যাটাগরি পেজ ও সর্টিং** — দাম কম থেকে বেশি / বেশি থেকে কম, স্কেলিটন লোডিং ও এম্পটি স্টেট সহ
5. **Better Auth দিয়ে অথেন্টিকেশন** — ইমেইল/পাসওয়ার্ড, Google ও GitHub লগইন, প্রোফাইল ও নাম আপডেট, টোস্ট নোটিফিকেশন
6. মোবাইল, ট্যাবলেট ও ডেস্কটপ — সব স্ক্রিনে রেসপনসিভ

## 🚀 Run Locally

```bash
npm install
npm run dev
```

`.env` ফাইলে নিচের ভ্যালুগুলো দিন:

```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## 🔗 Live Link

(ডিপ্লয় করার পর এখানে লিংক বসান)
