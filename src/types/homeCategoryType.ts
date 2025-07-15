import { ReactNode } from "react";
import { Deal } from "./dealType";

export interface HomeCategory {
    discount: ReactNode;
    id?: number;
    categoryId: string;
    section?: string;
    name?: string;
    image: string;
    parentCategoryId?: string;
}

export interface HomeData {
    healthcareCategories: HomeCategory[]; 
    medicineCategories: HomeCategory[];
    essentialsCategories: HomeCategory[];
    deals: Deal[];
    dealCategories: HomeCategory[];
}


export enum HomeCategorySection {
    HEALTHCARE_CATEGORIES,
    MEDICINE_CATEGORIES,
    ESSENTIALS_CATEGORIES,
    DEALS
}

