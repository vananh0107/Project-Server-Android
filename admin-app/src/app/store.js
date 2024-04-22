import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import producReducer from './features/product/productSlice';
import enquiryReducer from './features/enquiry/EnquirySlice';
import orderReducer from './features/order/OrderSlice';
import uploadReducer from './features/upload/uploadSlice';
import couponReducer from './features/coupon/couponSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: producReducer,
    enquiry: enquiryReducer,
    order: orderReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
