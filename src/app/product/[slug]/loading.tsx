const ProductLoading = () => {
  return (
    <div>
      <div className="skeleton h-4 w-48"></div>
      <div className="skeleton mt-6 h-40 w-full rounded-2xl"></div>
      <div className="skeleton mt-6 h-48 w-full rounded-2xl"></div>
      <div className="skeleton mt-6 h-96 w-full rounded-2xl"></div>
    </div>
  );
};

export default ProductLoading;
