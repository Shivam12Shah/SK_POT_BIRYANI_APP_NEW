import { createSlice } from '@reduxjs/toolkit';

// Simple slice to manage user delivery addresses
// In a real app this would be loaded from an API or local storage
const initialState = [];

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      // payload: { id, name, phone, address, city, state, pincode, type, isDefault }
      const isFirst = state.length === 0;
      const newAddress = {
        ...action.payload,
        isDefault: isFirst ? true : !!action.payload.isDefault,
      };
      if (newAddress.isDefault) {
        state.forEach(a => {
          a.isDefault = false;
        });
      }
      state.push(newAddress);
    },
    setDefaultAddress: (state, action) => {
      const id = action.payload;
      state.forEach(addr => {
        addr.isDefault = addr.id === id;
      });
    },
    deleteAddress: (state, action) => {
      const id = action.payload;
      const remaining = state.filter(a => a.id !== id);
      // If we removed the default, make first one default
      if (remaining.length > 0 && !remaining.some(a => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    },
  },
});

export const { addAddress, setDefaultAddress, deleteAddress } =
  addressesSlice.actions;

export default addressesSlice.reducer;


