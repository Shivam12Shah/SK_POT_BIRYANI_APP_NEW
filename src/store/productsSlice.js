import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../api';
// import { biryaniItems } from '../data/dummyData'; // Keeping for reference

/**
 * Fetch products from API
 */
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  try {
    console.log('🍽️ [Products] Fetching food items from API...');
    const response = await productService.getAll();
    console.log('✅ [Products] Food items fetched:', response);

    // Handle different response formats
    const products = response.data || response.products || response;
    return products;
  } catch (error) {
    console.error('❌ [Products] Failed to fetch food items:', error);
    throw error;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const idx = state.items.findIndex(p => p._id === action.payload._id || p.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setProducts, addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
