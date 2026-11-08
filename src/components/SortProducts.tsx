"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/lib/data";
import { toBn } from "@/lib/format";

const SortProducts = ({ products }: { products: IProduct[] }) => {
  const [sort, setSort] = useState("default");

  // দাম number হিসেবেই সর্ট হচ্ছে (বাংলা অঙ্কে শুধু দেখানো হয়)
  const sortedProducts = [...products];
  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-card p-4">
        <label htmlFor="sort" className="text-sm text-neutral-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-3 mt-4 text-sm text-neutral-500">
        মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SortProducts;
