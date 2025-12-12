/**
 * Cart Actions
 * Redux thunk actions for cart API operations
 */

import { cartService } from '../api';
import { addToCart as addToCartLocal, clearCart, setCartFromAPI } from './cartSlice';

/**
 * Fetch user's cart from API
 */
export const fetchCartAPI = () => {
    return async (dispatch, getState) => {
        // Check if user is authenticated
        const { user } = getState();
        if (!user.loggedIn || !user.token) {
            console.log('⚠️ [Cart] User not authenticated, skipping cart fetch');
            return { success: false, error: 'not_authenticated' };
        }

        try {
            console.log('🛒 [Cart] Fetching cart from API...');
            const response = await cartService.getCart();
            console.log('✅ [Cart] Cart fetched successfully:', response);

            // Update local cart state with fetched cart
            // Handle different response formats
            const cartItems = response;
            dispatch(setCartFromAPI(cartItems));

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to fetch cart:', error);
            return { success: false, error: error.error || 'Failed to fetch cart' };
        }
    };
};

/**
 * Add item to cart via API
 * @param {string} foodId - The food item ID
 * @param {number} qty - Quantity to add
 * @param {object} selectedAddons - Selected addons object
 * @param {object} product - Product object for local state
 */
export const addToCartAPI = (foodId, qty = 1, selectedAddons = {}, product = null) => {
    return async (dispatch, getState) => {
        // Check if user is authenticated
        const { user } = getState();
        if (!user.loggedIn || !user.token) {
            console.log('⚠️ [Cart] User not authenticated');
            return { success: false, error: 'auth_required', message: 'Please login to add items to cart' };
        }

        try {
            console.log('🛒 [Cart] Adding to cart via API:', { foodId, qty, selectedAddons });
            console.log('📦 [Cart] Request body:', JSON.stringify({ foodId, qty, selectedAddons }, null, 2));

            const response = await cartService.addToCart(foodId, qty, selectedAddons);
            console.log('✅ [Cart] Item added successfully:', response);

            // Also update local Redux state if product data is provided
            if (product) {
                // Convert selectedAddons to customizations format for local state
                const customizations = {
                    dips: selectedAddons.dip ? [selectedAddons.dip] : [],
                    beverages: selectedAddons.beverage ? [selectedAddons.beverage] : [],
                    drinks: selectedAddons.drink ? [selectedAddons.drink] : [],
                };

                dispatch(addToCartLocal({
                    product,
                    quantity: qty,
                    customizations,
                }));
            }

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to add to cart:', error);

            // Fallback: Add to local cart even if API fails
            if (product) {
                const customizations = {
                    dips: selectedAddons.dip ? [selectedAddons.dip] : [],
                    beverages: selectedAddons.beverage ? [selectedAddons.beverage] : [],
                    drinks: selectedAddons.drink ? [selectedAddons.drink] : [],
                };

                dispatch(addToCartLocal({
                    product,
                    quantity: qty,
                    customizations,
                }));

                console.log('🔄 [Cart] Added to local cart as fallback');
            }

            return { success: false, error: error.error || 'Failed to add to cart' };
        }
    };
};

/**
 * Get cart from API
 */
export const fetchCart = () => {
    return async (dispatch) => {
        try {
            console.log('🛒 [Cart] Fetching cart from API...');
            const response = await cartService.getCart();
            console.log('✅ [Cart] Cart fetched:', response);

            // TODO: Update local cart state with API response
            // You may need to add a new reducer to handle this

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to fetch cart:', error);
            return { success: false, error: error.error || 'Failed to fetch cart' };
        }
    };
};

/**
 * Remove item from cart via API
 */
export const removeFromCartAPI = (itemId) => {
    return async (dispatch) => {
        try {
            console.log('🛒 [Cart] Removing from cart via API:', itemId);
            const response = await cartService.removeFromCart(itemId);
            console.log('✅ [Cart] Item removed successfully');

            // Also update local state
            dispatch({ type: 'cart/removeFromCart', payload: itemId });

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to remove from cart:', error);
            return { success: false, error: error.error || 'Failed to remove from cart' };
        }
    };
};

/**
 * Update cart item quantity via API
 */
export const updateCartItemAPI = (itemId, quantity) => {
    return async (dispatch) => {
        try {
            console.log('🛒 [Cart] Updating cart item via API:', { itemId, quantity });
            const response = await cartService.updateCartItem(itemId, quantity);
            console.log('✅ [Cart] Item updated successfully');

            // Also update local state
            dispatch({ type: 'cart/updateQuantity', payload: { itemId, quantity } });

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to update cart item:', error);
            return { success: false, error: error.error || 'Failed to update cart item' };
        }
    };
};

/**
 * Update cart item addons via API
 * @param {string} foodId - The food item ID
 * @param {object} selectedAddons - Selected addons object (set to null to remove)
 * @param {object} product - Product object for local state update
 */
export const updateCartAddonsAPI = (foodId, selectedAddons = {}, product = null) => {
    return async (dispatch, getState) => {
        // Check if user is authenticated
        const { user } = getState();
        if (!user.loggedIn || !user.token) {
            console.log('⚠️ [Cart] User not authenticated');
            return { success: false, error: 'auth_required', message: 'Please login to update cart' };
        }

        try {
            console.log('🛒 [Cart] Updating cart addons via API:', { foodId, selectedAddons });
            console.log('📦 [Cart] Request body:', JSON.stringify({ foodId, selectedAddons }, null, 2));

            const response = await cartService.updateCartAddons(foodId, selectedAddons);
            console.log('✅ [Cart] Addons updated successfully:', response);

            // TODO: Update local cart state with new addons
            // You may need to add a reducer to handle addon updates

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to update addons:', error);
            return { success: false, error: error.error || 'Failed to update addons' };
        }
    };
};

/**
 * Update cart item quantity via API
 * @param {string} foodId - The food item ID
 * @param {number} qty - New quantity
 */
export const updateCartQtyAPI = (foodId, qty) => {
    return async (dispatch, getState) => {
        // Check if user is authenticated
        const { user } = getState();
        if (!user.loggedIn || !user.token) {
            console.log('⚠️ [Cart] User not authenticated');
            return { success: false, error: 'auth_required', message: 'Please login to update cart' };
        }

        try {
            console.log('🛒 [Cart] Updating cart quantity via API:', { foodId, qty });
            console.log('📦 [Cart] Request body:', JSON.stringify({ foodId, qty }, null, 2));

            const response = await cartService.updateCartQty(foodId, qty);
            console.log('✅ [Cart] Quantity updated successfully:', response);

            // TODO: Update local cart state with new quantity

            return { success: true, data: response };
        } catch (error) {
            console.error('❌ [Cart] Failed to update quantity:', error);
            return { success: false, error: error.error || 'Failed to update quantity' };
        }
    };
};

/**
 * Check if a product is already in the cart
 * @param {array} cartItems - Current cart items from Redux state
 * @param {string} productId - Product ID to check
 * @returns {boolean} - True if product is in cart
 */
export const isProductInCart = (cartItems, productId) => {
    if (!Array.isArray(cartItems)) return false;
    return cartItems.some(item =>
        item.productId === productId ||
        item.product?.id === productId ||
        item.product?._id === productId ||
        item.food?._id === productId
    );
};

/**
 * Get cart item by product ID
 * @param {array} cartItems - Current cart items from Redux state
 * @param {string} productId - Product ID to find
 * @returns {object|null} - Cart item or null if not found
 */
export const getCartItemByProductId = (cartItems, productId) => {
    if (!Array.isArray(cartItems)) return null;
    return cartItems.find(item =>
        item.productId === productId ||
        item.product?.id === productId ||
        item.product?._id === productId ||
        item.food?._id === productId
    ) || null;
};
