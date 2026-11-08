import { getCategories } from "@/lib/data";
import NavLink from "./NavLink";

const NavLinks = async () => {
  const categories = await getCategories();

  return (
    <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:gap-3">
      {categories.map((c) => (
        <NavLink key={c.id} href={`/category/${c.slug}`}>
          <span>{c.icon}</span>
          <span>{c.nameBn}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
