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
      console.log('🔄 [Redux] setLocation reducer called with:', action.payload);
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.readableAddress = action.payload.readableAddress;
      state.loading = false;
      state.error = null;
      console.log('✅ [Redux] Location state updated:', {
        latitude: state.latitude,
        longitude: state.longitude,
        readableAddress: state.readableAddress,
      });
    },
    setLocationLoading(state, action) {
      console.log('🔄 [Redux] setLocationLoading:', action.payload);
      state.loading = action.payload;
    },
    setLocationError(state, action) {
      console.log('❌ [Redux] setLocationError:', action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    clearLocation(state) {
      console.log('🗑️ [Redux] clearLocation called');
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

