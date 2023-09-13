export interface CreateVersionPayload {
    title: string;
    product: string;
    description: string;
    quantity: number;
    price: number;
}

export interface UpdateProductPayload {
    productId: string;
    title?: string;
    description?: string;
    category?: string;
}

export interface UpdateVersionPayload {
    productVId: string;
    title?: string;
    description?: string;
    price?: number;
    file?: File;
}

export interface AddVersionQuantityPayload {
    product: string;
    quantity: number;
    price: number;
}
