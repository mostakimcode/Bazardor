import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { IProduct } from "@/lib/data";
import { toBn, unitFull } from "@/lib/format";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="rounded-2xl border border-gray-200 bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gray-100 text-2xl">
            {product.image}
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{product.nameBn}</h3>
            <p className="text-sm text-neutral-500">{unitFull(product.unit)}</p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-neutral-500">আজকের দাম</p>
            <p className="text-xl font-bold">{toBn(product.today)} টাকা</p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
