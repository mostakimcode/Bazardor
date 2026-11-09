import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getProducts } from "@/lib/data";
import { toBn, unitShort } from "@/lib/format";

const Marquee = async () => {
  const products = await getProducts();

  return (
    <div className="border-b border-gray-200 bg-card text-sm">
      <MarqueeText className="py-2" direction="right" duration={20} pauseOnHover>
        {products.map((p) => {
          const { dir, pct } = p.change;
          const color =
            dir === "up"
              ? "text-red-600"
              : dir === "down"
                ? "text-green-600"
                : "text-gray-500";
          const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

          return (
            <span
              key={p.id}
              className="mr-6 inline-flex items-center gap-2 border-r border-gray-200 pr-6"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-neutral-600">
                {toBn(p.today)} টাকা/{unitShort(p.unit)}
              </span>
              <span className={`font-semibold ${color}`}>
                {arrow} {toBn(Math.abs(pct), 1)}%
              </span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
