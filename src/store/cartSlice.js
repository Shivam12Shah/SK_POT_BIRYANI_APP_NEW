import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { id, productId, product, quantity, customizations: { dips, beverages, drinks } }
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
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
