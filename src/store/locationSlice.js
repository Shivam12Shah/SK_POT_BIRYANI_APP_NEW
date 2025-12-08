import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
    readableAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.readableAddress = action.payload.readableAddress;
      state.loading = false;
      state.error = null;
    },
    setLocationLoading(state, action) {
      state.loading = action.payload;
    },
    setLocationError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearLocation(state) {
      state.latitude = null;
      state.longitude = null;
      state.readableAddress = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLocation, setLocationLoading, setLocationError, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;

