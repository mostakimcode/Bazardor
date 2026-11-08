import { toBn } from "@/lib/format";

interface Change {
  dir: "up" | "down" | "flat";
  pct: number;
}

const ChangeBadge = ({ change }: { change: Change }) => {
  const { dir, pct } = change;

  // Figma অনুযায়ী: দাম বাড়া = লাল, কমা = সবুজ
  const style = {
    up: "bg-red-50 text-red-600",
    down: "bg-green-50 text-green-600",
    flat: "bg-gray-100 text-gray-500",
  }[dir];

  const arrow = { up: "▲", down: "▼", flat: "—" }[dir];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {arrow} {toBn(Math.abs(pct), 1)}%
    </span>
  );
};

export default ChangeBadge;
