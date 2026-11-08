import ProductSkeleton from "@/components/ProductSkeleton";

const LoadingPage = () => {
  return (
    <div>
      <div className="skeleton h-52 w-full rounded-3xl"></div>
      <div className="skeleton mb-4 mt-10 h-7 w-48"></div>
      <ProductSkeleton count={6} />
    </div>
  );
};

export default LoadingPage;
