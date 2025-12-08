import { createSlice } from '@reduxjs/toolkit';

// Simple orders slice to store past and current orders for history & tracking
const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      // action.payload: { id, date, status, items, total }
      state.unshift(action.payload);
    },
    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;


