/**
 * API Services
 * High-level service methods for different features
 */

import apiClient from './client';
import { API_ENDPOINTS } from './config';

/**
 * Auth Services
 */
export const authService = {
    sendOTP: async (phone) => {
        return apiClient.post(API_ENDPOINTS.SEND_OTP, { phone });
    },

    verifyOTP: async (phone, otp, role = 'user') => {
        return apiClient.post(API_ENDPOINTS.VERIFY_OTP, { phone, otp, role });
    },

    logout: async () => {
        return apiClient.post(API_ENDPOINTS.LOGOUT);
    },

    refreshToken: async (refreshToken) => {
        return apiClient.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
    },
};

/**
 * User Services
 */
export const userService = {
    getProfile: async () => {
        return apiClient.get(API_ENDPOINTS.USER_PROFILE);
    },

    updateProfile: async (profileData) => {
        return apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
    },
};

/**
 * Product/Food Services
 */
export const productService = {
    getAll: async (params = {}) => {
        return apiClient.get(API_ENDPOINTS.PRODUCTS, params);
    },

    getById: async (id) => {
        return apiClient.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
    },

    search: async (query, filters = {}) => {
        return apiClient.get(API_ENDPOINTS.SEARCH_PRODUCTS, { query, ...filters });
    },
};

/**
 * Cart Services
 */
export const cartService = {
    getCart: async () => {
        return apiClient.get(API_ENDPOINTS.GET_CART); // Changed from API_ENDPOINTS.CART to API_ENDPOINTS.GET_CART
    },

    addToCart: async (foodId, qty = 1, selectedAddons = {}) => {
        return apiClient.post(API_ENDPOINTS.ADD_TO_CART, {
            foodId,
            qty,
            selectedAddons,
        });
    },

    updateCartAddons: async (foodId, selectedAddons = {}) => {
        return apiClient.post(API_ENDPOINTS.UPDATE_CART_ADDONS, {
            foodId,
            selectedAddons,
        });
    },

    updateCartQty: async (foodId, qty) => {
        return apiClient.post(API_ENDPOINTS.UPDATE_CART_QTY, {
            foodId,
            qty,
        });
    },

    updateCartItem: async (itemId, quantity) => {
        return apiClient.put(API_ENDPOINTS.UPDATE_CART_ITEM(itemId), { quantity });
    },

    removeFromCart: async (itemId) => {
        return apiClient.delete(API_ENDPOINTS.REMOVE_FROM_CART(itemId));
    },
};

/**
 * Order Services
 */
export const orderService = {
    getAll: async (params = {}) => {
        return apiClient.get(API_ENDPOINTS.ORDERS, params);
    },

    getById: async (orderId) => {
        return apiClient.get(API_ENDPOINTS.ORDER_DETAIL(orderId));
    },

    create: async (orderData) => {
        return apiClient.post(API_ENDPOINTS.CREATE_ORDER, orderData);
    },

    trackOrder: async (orderId) => {
        return apiClient.get(API_ENDPOINTS.TRACK_ORDER(orderId));
    },
};

/**
 * Address Services
 */
export const addressService = {
    getAll: async () => {
        return apiClient.get(API_ENDPOINTS.ADDRESSES);
    },

    getById: async (addressId) => {
        return apiClient.get(API_ENDPOINTS.ADDRESS_DETAIL(addressId));
    },

    create: async (addressData) => {
        return apiClient.post(API_ENDPOINTS.CREATE_ADDRESS, addressData);
    },

    update: async (addressId, addressData) => {
        return apiClient.put(API_ENDPOINTS.UPDATE_ADDRESS(addressId), addressData);
    },

    delete: async (addressId) => {
        return apiClient.delete(API_ENDPOINTS.DELETE_ADDRESS(addressId));
    },
};

/**
 * Location Services
 */
export const locationService = {
    geocode: async (address) => {
        return apiClient.post(API_ENDPOINTS.GEOCODE, { address });
    },

    reverseGeocode: async (latitude, longitude) => {
        return apiClient.post(API_ENDPOINTS.REVERSE_GEOCODE, {
            latitude,
            longitude,
        });
    },
};

// Export all services
export default {
    auth: authService,
    user: userService,
    product: productService,
    cart: cartService,
    order: orderService,
    address: addressService,
    location: locationService,
};
