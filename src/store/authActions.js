/**
 * Auth Actions
 * Redux thunk actions for authentication with OTP
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../api';
import { setUser, clearUser, setToken } from './userSlice';
import { apiClient } from '../api';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@user_data';

/**
 * Send OTP to phone number
 */
export const sendOTP = (phone) => {
    return async (dispatch) => {
        try {
            console.log('📱 [Auth] Sending OTP to:', phone);
            const response = await authService.sendOTP(phone);
            console.log('✅ [Auth] OTP sent successfully');
            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Auth] Failed to send OTP:', error);
            return { success: false, error: error.error || 'Failed to send OTP' };
        }
    };
};

/**
 * Verify OTP and login
 */
export const verifyOTP = (phone, otp, role = 'user') => {
    return async (dispatch) => {
        try {
            console.log('🔐 [Auth] Verifying OTP for:', phone, 'Role:', role);
            const response = await authService.verifyOTP(phone, otp, role);

            if (response.token) {
                // Store token in AsyncStorage
                await AsyncStorage.setItem(TOKEN_KEY, response.token);

                // Store user data in AsyncStorage
                if (response.user) {
                    await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
                }

                // Set token in API client for future requests
                apiClient.setAuthToken(response.token);

                // Update Redux store
                dispatch(setUser({
                    profile: response.user,
                    token: response.token,
                }));

                console.log('✅ [Auth] Login successful');

                // Fetch user's cart after successful login
                const { fetchCartAPI } = require('./cartActions');
                dispatch(fetchCartAPI());

                return { success: true, data: response };
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            console.error('❌ [Auth] OTP verification failed:', error);
            return { success: false, error: error.error || 'Invalid OTP' };
        }
    };
};

/**
 * Logout user
 */
export const logout = () => {
    return async (dispatch) => {
        try {
            console.log('👋 [Auth] Logging out...');

            // Call logout API
            await authService.logout();

            // Clear AsyncStorage
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);

            // Clear token from API client
            apiClient.clearAuthToken();

            // Clear Redux store
            dispatch(clearUser());

            console.log('✅ [Auth] Logout successful');
            return { success: true };
        } catch (error) {
            console.error('❌ [Auth] Logout failed:', error);

            // Clear local data even if API call fails
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_KEY);
            apiClient.clearAuthToken();
            dispatch(clearUser());

            return { success: false, error: error.error || 'Logout failed' };
        }
    };
};

/**
 * Load user from AsyncStorage on app start
 */
export const loadUserFromStorage = () => {
    return async (dispatch) => {
        try {
            console.log('📂 [Auth] Loading user from storage...');

            const token = await AsyncStorage.getItem(TOKEN_KEY);
            const userData = await AsyncStorage.getItem(USER_KEY);

            if (token && userData) {
                const user = JSON.parse(userData);

                // Set token in API client
                apiClient.setAuthToken(token);

                // Update Redux store
                dispatch(setUser({
                    profile: user,
                    token: token,
                }));

                console.log('✅ [Auth] User loaded from storage');

                // Fetch user's cart after restoring session
                const { fetchCartAPI } = require('./cartActions');
                dispatch(fetchCartAPI());

                return { success: true, user };
            } else {
                console.log('ℹ️ [Auth] No stored user found');
                return { success: false };
            }
        } catch (error) {
            console.error('❌ [Auth] Failed to load user:', error);
            return { success: false, error: error.message };
        }
    };
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (state) => {
    return state.user.loggedIn && state.user.token !== null;
};
