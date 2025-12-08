import { useDispatch, useSelector } from 'react-redux';
import store from './store';

// Lightweight wrappers — project is JS so no TS types included.
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Also export the store for direct use if needed
export default store;
