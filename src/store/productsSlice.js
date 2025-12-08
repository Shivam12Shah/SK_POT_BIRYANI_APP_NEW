import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { biryaniItems } from '../data/dummyData';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return [];
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: biryaniItems,
    status: 'idle',
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
      const idx = state.items.findIndex(p => p.id === action.payload.id);
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
