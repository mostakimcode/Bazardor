const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: IMarket[];
}

export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await res.json();
  return data;
};
