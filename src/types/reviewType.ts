// src/types/reviewType.ts

export interface Review {
    id: number;
    rating: number;
    reviewText: string;
    createdAt: string;
    user: {
        name: string;
    };
    product: {
        id: number;
        name: string;
    };
}
