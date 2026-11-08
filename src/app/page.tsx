import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import { toBn } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  // সবচেয়ে বেশি বাড়া ৬টি
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // সবচেয়ে বেশি কমা ৬টি
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      {/* hero */}
      <section className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-card p-6 md:flex-row md:justify-between md:p-8">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            {date}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-0 bg-brand text-white shadow-md hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-56 md:w-80"
        />
      </section>

      {/* দাম বেড়েছে */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* দাম কমেছে */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          <span className="text-green-600">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* সব পণ্য */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-neutral-500">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
