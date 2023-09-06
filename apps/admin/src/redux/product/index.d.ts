export interface CreateVersionPayload {
    title: string;
    product: string;
    description: string;
    quantity: number;
    price: number;
}

export interface AddVersionQuantityPayload {
    product: string;
    quantity: number;
    price: number;
}
