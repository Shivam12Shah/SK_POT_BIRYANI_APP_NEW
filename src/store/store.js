import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import locationReducer from './locationSlice';
import ordersReducer from './ordersSlice';
import addressesReducer from './addressesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    location: locationReducer,
    orders: ordersReducer,
    addresses: addressesReducer,
  },
});

export default store;
