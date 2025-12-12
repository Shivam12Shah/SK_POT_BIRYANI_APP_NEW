/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

import { Platform } from 'react-native';

// Base URL for your API
// Android emulator uses 10.0.2.2 to access localhost on host machine
// iOS simulator can use localhost directly
export const API_BASE_URL = Platform.select({
    android: 'http://10.0.2.2:3000/api', // Android emulator
    ios: 'http://localhost:3000/api',     // iOS simulator
    default: 'http://localhost:3000/api',
});

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',

    // User
    USER_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',

    // Products/Food
    PRODUCTS: '/food',
    PRODUCT_DETAIL: (id) => `/food/${id}`,
    SEARCH_PRODUCTS: '/food/search',

    // Cart
    ADD_TO_CART: '/cart/add',
    GET_CART: '/cart',
    UPDATE_CART_ITEM: '/cart/update',
    REMOVE_CART_ITEM: '/cart/remove',
    CLEAR_CART: '/cart/clear',
    UPDATE_CART_ADDONS: '/cart/update-addons',
    UPDATE_CART_QTY: '/cart/update-qty',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id) => `/orders/${id}`,
    CREATE_ORDER: '/orders',
    TRACK_ORDER: (id) => `/orders/${id}/track`,

    // Addresses
    ADDRESSES: '/addresses',
    ADDRESS_DETAIL: (id) => `/addresses/${id}`,
    CREATE_ADDRESS: '/addresses',
    UPDATE_ADDRESS: (id) => `/addresses/${id}`,
    DELETE_ADDRESS: (id) => `/addresses/${id}`,

    // Location
    GEOCODE: '/location/geocode',
    REVERSE_GEOCODE: '/location/reverse-geocode',
};

// Request timeout (in milliseconds)
export const REQUEST_TIMEOUT = 30000;

// Headers
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};
