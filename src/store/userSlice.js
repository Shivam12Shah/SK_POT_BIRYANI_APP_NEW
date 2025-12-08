import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loggedIn: false,
    deliveryTime: null,
  },
  reducers: {
    setUser(state, action) {
      state.profile = action.payload;
      state.loggedIn = !!action.payload;
    },
    clearUser(state) {
      state.profile = null;
      state.loggedIn = false;
      state.deliveryTime = null;
    },
    setDeliveryTime(state, action) {
      state.deliveryTime = action.payload;
    },
  },
});

export const { setUser, clearUser, setDeliveryTime } = userSlice.actions;
export default userSlice.reducer;
