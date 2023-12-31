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
    islogin: `${baseUrl}/islogin`,
};

const userUrl = {
    getMe: `${baseUrl}/user/me`,
    getUser: `${baseUrl}/user`,
    getStats: `${baseUrl}/user/stats`,
    findUser: (query: string) => `${baseUrl}/user/find?${query}`,
    findRoles: `${baseUrl}/user/role/find`,
    updateUser: `${baseUrl}/user/update`,
    updateMe: `${baseUrl}/user/me`,
    assignRole: `${baseUrl}/user/role`,
    dismissRole: `${baseUrl}/user/role`,
    createUser: `${baseUrl}/user/new`,
    deleteUser: (id: string) => `${baseUrl}/user/delete/${id}`,
};

const shopUrl = {
    findShop: (text = "") => `${baseUrl}/shop?text=${text}`,
};

const productUrl = {
    createProduct: `${baseUrl}/product/new`,
    createCategory: `${baseUrl}/product/category/new`,
    createProductVersion: `${baseUrl}/product/version/new`,
    addQuantityProductVersion: (keyId: string) =>
        `${baseUrl}/product/version/update/${keyId}`,
    findProduct: `${baseUrl}/product`,
    findProductVersion: `${baseUrl}/product/version`,
    getOneProduct: (productId: string) => `${baseUrl}/product?id=${productId}`,
    getOneProductVersion: (productVId: string) =>
        `${baseUrl}/product/version?id=${productVId}`,
    getProductSummary: `${baseUrl}/product/summary`,
    findCategory: `${baseUrl}/product/category`,
    loadCategorieStat: `${baseUrl}/product/category/count`,
    getStats: `${baseUrl}/product/stats`,
    updateProduct: (productId: string) =>
        `${baseUrl}/product/update/${productId}`,
    updateProductVersion: (productVId: string) =>
        `${baseUrl}/product/version/update/${productVId}`,
    deleteProductVersion: (versionId: string) =>
        `${baseUrl}/product/version/${versionId}`,
    addPhotoToVersion: (productVId: string) =>
        `${baseUrl}/product/version/photo?productVId=${productVId}`,
};

const orderUrl = {
    findOrders: `${baseUrl}/order`,
    saveLocalOrder: `${baseUrl}/order/local`,
    cancelOrder: `${baseUrl}/order/cancel`,
    finishOrder: `${baseUrl}/order/done`,
    getStats: `${baseUrl}/order/stats`,
    getSummary: `${baseUrl}/order/summary`,
    getOne: (orderId: string) => `${baseUrl}/order/one/${orderId}`,
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
