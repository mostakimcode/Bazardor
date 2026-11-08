import Link from "next/link";

const EmptyState = ({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-black leading-none text-brand sm:text-9xl">
          ৪০৪
        </h1>

        <div className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-green-300"></span>
          <span className="size-2 rounded-full bg-brand"></span>
          <span className="h-px w-16 bg-green-300"></span>
        </div>

        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="mb-8 leading-relaxed text-neutral-500">{message}</p>

        <Link
          href="/"
          className="btn border-0 bg-brand px-8 text-white shadow-md hover:bg-brand-dark"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
