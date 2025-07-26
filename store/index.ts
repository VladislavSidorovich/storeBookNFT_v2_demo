import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
