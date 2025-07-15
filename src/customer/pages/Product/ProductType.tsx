export interface ProductType {
    id: number;
    title: string;
    description: string;
    category?: {
      id: number;
      name?: string;
    };
    categoryId?: number;
  
    price?: number;
    mrpPrice?: number;
    originalPrice?: number;
  
    discount?: string;
    discountPercentage?: string;
  
    images: string[];
  
    seller?: {
      businessDetails?: {
        businessName?: string;
      };
    };
  }