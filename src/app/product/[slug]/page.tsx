import ChangeBadge from "@/components/ChangeBadge";
import { getProducts } from "@/lib/data";
import { toBn, toBnPrice, unitFull, unitShort } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // প্রতিটি বাজারের গড় বের করে গড় অনুযায়ী সাজানো
  const markets = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = Math.min(...markets.map((m) => m.min));
  const maxPrice = Math.max(...markets.map((m) => m.max));
  const avgPrice = Math.round(
    markets.reduce((sum, m) => sum + m.avg, 0) / markets.length,
  );

  const diff = product.today - product.yesterday;
  const statusText = {
    up: "বেড়েছে",
    down: "কমেছে",
    flat: "অপরিবর্তিত আছে",
  }[product.change.dir];

  return (
    <div>
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
        <Link href="/" className="hover:text-brand">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span>{product.nameBn}</span>
      </nav>

      {/* top summary */}
      <section className="mt-5 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gray-100 text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {unitFull(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <b>{statusText}</b>
              {diff !== 0 && <> · {toBn(Math.abs(diff))} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 px-8 py-5 text-center">
          <p className="text-sm text-neutral-500">আজকের দাম</p>
          <p className="text-4xl font-bold">{toBn(product.today)}</p>
          <p className="text-sm text-neutral-500">
            টাকা / {unitShort(product.unit)}
          </p>
          <div className="mt-2">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      {/* price summary */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 sm:p-6">
        <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-neutral-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {toBn(minPrice)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-neutral-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-neutral-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {toBn(maxPrice)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-neutral-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-neutral-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {toBn(avgPrice)} <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="text-xs text-neutral-500">
              প্রতি {unitShort(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="table min-w-[640px]">
            <thead>
              <tr className="text-neutral-500">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m.market} className="hover:bg-green-50/50">
                  <td className="font-medium">{m.market}</td>
                  <td className="text-neutral-600">{m.division}</td>
                  <td className="text-right">{toBnPrice(m.min)} টাকা</td>
                  <td className="text-right">{toBnPrice(m.max)} টাকা</td>
                  <td className="text-right font-bold">
                    {toBnPrice(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
