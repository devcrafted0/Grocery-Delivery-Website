export type product = {
    _id: string;
    name: string;
    category: string;
    price: number;
    offerPrice: number;
    image: string[];
    description: string[];
    createdAt: string;
    updatedAt: string;
    inStock: boolean;
    rating?: number;
}