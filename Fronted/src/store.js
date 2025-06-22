import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});