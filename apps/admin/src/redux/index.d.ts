export type ApiResponse<T = object, D = any> = {
    message: string;
    data?: T;
    extra?: D;
};

export interface DefaultInfo {
    id?: string;
    created_at?: Date;
    deleted_at?: Date;
    updated_at?: Date;
}

export interface ShopInfo extends DefaultInfo {
    title?: string;
    address?: string;
    profile?: string;
    cover?: string;
    users?: UserShopInfo[];
}

export interface UserInfo extends DefaultInfo {
    names?: string;
    username: ?string;
    email?: string;
    secret?: string;
    birth?: string;
    address?: string;
    bank?: string;
    shops?: UserShopInfo[];
}

export interface UserShopInfo extends DefaultInfo {
    user?: UserInfo;
    shop?: ShopInfo;
    roles?: UserShopRoleInfo[];
}

export interface RoleInfo extends DefaultInfo {
    title?: string;
    description?: string;
    user_shops?: UserShopRoleInfo[];
}

export interface UserShopRoleInfo extends DefaultInfo {
    role?: RoleInfo;
    user_shop?: UserShopInfo;
}

export interface ProductInfo extends DefaultInfo {
    title?: string;
    description?: string;
    brand?: string;
    sales?: number;
    shop?: ShopInfo;
    category?: CategoryInfo;
    product_v?: ProductVersionInfo[];
}
export interface ProductVersionInfo extends DefaultInfo {
    title?: string;
    description?: string;
    quantity?: number;
    price?: number;
    key_id?: string;
    product?: ProductInfo;
}
export interface CategoryInfo extends DefaultInfo {
    title?: string;
    description?: string;
    shop?: ShopInfo;
}

export interface CartInfo extends DefaultInfo {
    user?: UserInfo;
}
export interface CartProductInfo extends DefaultInfo {
    quantity?: number;
    shop?: ShopInfo;
    product?: ProductInfo;
    product_v?: ProductVersionInfo;
}

export interface ProductStats {
    total_product: number;
    total_variant: number;
    total_category: number;
    product_without_category: number;
    product_out_of_stock: number;
    total_order: number;
    total_insitu: number;
    total_delivery: number;
}

export interface CategoryStats {
    id: string;
    products: string;
    title: string;
}

enum OrderType {
    INSITU = "INSITU",
    DELIVERY = "DELIVERY",
}
enum OrderState {
    DONE = "DONE",
    PENDING = "PENDING",
    ERROR = "ERROR",
}
export interface OrderInfo extends DefaultInfo {
    type: OrderType;
    address: string;
    date: Date;
    paid: boolean;
    state: OrderState;
    user: UserInfo;
    shop: ShopInfo;
    products: OrderProductInfo[];
}

export interface OrderProductInfo extends DefaultInfo {
    order: OrderInfo;
    product_v: ProductVersionInfo;
    product: ProductInfo;
    quantity: number;
}
