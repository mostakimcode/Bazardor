import ProductSkeleton from "@/components/ProductSkeleton";

const CategoryLoading = () => {
  return (
    <div>
      <div className="skeleton h-24 w-full rounded-2xl"></div>
      <div className="skeleton mt-5 h-16 w-full rounded-2xl"></div>
      <div className="mt-5">
        <ProductSkeleton count={6} />
      </div>
    </div>
  );
};

export default CategoryLoading;
