import { number } from "yup";
import { Seller } from "./SellerTypes";

export interface Product{
    id?:number;
    title:string;
    description:string;
    mrpPrice:number;
    sellingPrice:number
    discountPercent:number;
    quantity: number;
    images: string[];
    numRatings?:number;
    category?:Category;
    seller?:Seller;
    createdAt?:Date;

}

export interface Category{
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
}
