import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cart items array
    grandTotal: 0, // Grand total from backend
    deliveryCharges: 0, // Delivery charges from backend
    _id: null, // Cart ID from backend
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1, customizations = {} } = action.payload;

      // Create a unique key for this product + customizations combination
      const customizationsKey = JSON.stringify({
        dips: (customizations.dips || []).map(d => d?.id).sort(),
        beverages: (customizations.beverages || []).map(b => b?.id).sort(),
        drinks: (customizations.drinks || []).map(d => d?.id).sort(),
      });

      // Check if the same product with same customizations already exists
      const existingItem = state.items.find(
        item =>
          item.productId === product.id &&
          JSON.stringify({
            dips: (item.customizations?.dips || []).map(d => d?.id).sort(),
            beverages: (item.customizations?.beverages || []).map(b => b?.id).sort(),
            drinks: (item.customizations?.drinks || []).map(d => d?.id).sort(),
          }) === customizationsKey
      );

      if (existingItem) {
        // If exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If not exists, add new item
        const cartItemId = `${product.id}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        state.items.push({
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          customizations,
        });
      }
    },
    setCartFromAPI(state, action) {
      // Update cart with data from backend API
      console.log('🔄 [CartSlice] Setting cart from API:', action.payload);

      // Backend returns: { items, grandTotal, deliveryCharges, _id, ... }
      if (action.payload) {
        state.items = action.payload.items || [];
        state.grandTotal = action.payload.grandTotal || 0;
        state.deliveryCharges = action.payload.deliveryCharges || 0;
        state._id = action.payload._id || null;
      } else {
        state.items = [];
        state.grandTotal = 0;
        state.deliveryCharges = 0;
        state._id = null;
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(i => i.id !== itemId);
    },
    updateQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existing = state.items.find(i => i.id === itemId);
      if (existing) {
        existing.quantity = Math.max(1, quantity);
      }
    },
    clearCart(state) {
      state.items = [];
      state.grandTotal = 0;
      state.deliveryCharges = 0;
      state._id = null;
    },
  },
});

export const { addToCart, setCartFromAPI, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
