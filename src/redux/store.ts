import { configureStore } from "@reduxjs/toolkit";
import cart from "./slices/cart";

export const store = configureStore({
  reducer: {
    cart: cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
