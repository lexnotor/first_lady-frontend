import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/v1`;

const apiFetch = async (type: string, route: string) => {
    const url = `${route}`;
    let data: any = null;
    switch (type) {
        case "get":
            data = await axios.get(url, {});
    }

    return data;
};

const authUrl = {
    login: `${baseUrl}/login`,
    signup: `${baseUrl}/signup`,
};

const userUrl = {
    getMe: `${baseUrl}/user/me`,
    getUser: `${baseUrl}/user`,
    getStats: `${baseUrl}/user/stats`,
};

const shopUrl = {
    findShop: (text = "") => `${baseUrl}/shop?text=${text}`,
};

const productUrl = {
    createProduct: `${baseUrl}/product/new`,
    createCategory: `${baseUrl}/product/category/new`,
    createProductVersion: `${baseUrl}/product/version/new`,
    findProduct: `${baseUrl}/product`,
    findProductVersion: `${baseUrl}/product/version`,
    getOneProduct: (productId: string) => `${baseUrl}/product?id=${productId}`,
    getOneProductVersion: (productVId: string) =>
        `${baseUrl}/product/version?id=${productVId}`,
    findCategory: `${baseUrl}/product/category`,
    loadCategorieStat: `${baseUrl}/product/category/count`,
    getStats: `${baseUrl}/product/stats`,
    deleteProductVersion: (versionId: string) =>
        `${baseUrl}/product/version/${versionId}`,
};

const orderUrl = {
    findOrders: `${baseUrl}/order`,
    saveLocalOrder: `${baseUrl}/order/local`,
    cancelOrder: `${baseUrl}/done`,
    finishOrder: `${baseUrl}/cancel`,
    getStats: `${baseUrl}/order/stats`,
};

const invoiceUrl = {
    getOrderInvoice: `${baseUrl}/facture`,
};

const cartUrl = {
    addItem: `${baseUrl}/cart/item/add`,
};

export {
    apiFetch,
    authUrl,
    baseUrl,
    cartUrl,
    orderUrl,
    productUrl,
    shopUrl,
    userUrl,
    invoiceUrl,
};
