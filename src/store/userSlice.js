import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    profile: null,
    token: null,
    deliveryTime: null,
  },
  reducers: {
    setUser(state, action) {
      state.loggedIn = true;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setDeliveryTime(state, action) {
      state.deliveryTime = action.payload;
    },
    clearUser(state) {
      state.loggedIn = false;
      state.profile = null;
      state.token = null;
      state.deliveryTime = null;
    },
  },
});

export const { setUser, setToken, setDeliveryTime, clearUser } = userSlice.actions;
export default userSlice.reducer;
