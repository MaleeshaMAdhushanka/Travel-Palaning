import {configureStore} from "@reduxjs/toolkit";

import authReducer from './slices/authSlice';
import packageReducer from './slices/packageSlice';

const store = configureStore({
   reducer: {
       auth: authReducer,
       package: packageReducer

   },


});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


