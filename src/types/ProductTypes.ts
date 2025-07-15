import { Seller } from "./SellerTypes";

export interface Category {
  id?: number;
  name: string;
  categoryId: string;
  parentCategory?: Category; // ✅ Supports nested levels
  level: number;
}

export interface Product {
  id: number;
  title: string;
  name: string; // ✅ Add this if used separately from title
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  price: number; // ✅ Needed for sorting and filtering
  originalPrice: number; // ✅ Used in ProductCart
  discount?: string; // ✅ Used in ProductCart
  discountPercent: number;
  quantity: number;
  images: string[];
  numRatings?: number;

  category?: Category;
  subCategory?: string; // ✅ For deeper level matching
  subSubCategory?: string; // ✅ For deeper level matching
  categoryId?: number; // ✅ Needed for routing
  seller?: Seller;
  createdAt?: Date;
}
