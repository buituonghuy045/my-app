export interface Product {
    id: string;
    name: string;
    price: number;
    categoryID: string;
}

export type Category = {
    id: number;
    name: string;
};