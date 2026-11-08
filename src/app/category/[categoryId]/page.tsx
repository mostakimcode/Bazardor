import EmptyState from "@/components/EmptyState";
import SortProducts from "@/components/SortProducts";
import { getCategories, getProducts } from "@/lib/data";
import { toBn } from "@/lib/format";
import { notFound } from "next/navigation";

const CategoryProducts = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === categoryId);

  if (!category) {
    notFound();
  }

  const products = await getProducts();
  const categoryProducts = products.filter((p) => p.category === category.slug);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-card p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-neutral-500">
            {toBn(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-5">
        {categoryProducts.length === 0 ? (
          <EmptyState
            title="কোনো পণ্য পাওয়া যায়নি"
            message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
          />
        ) : (
          <SortProducts products={categoryProducts} />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
