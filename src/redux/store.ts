import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { offsetSlice } from "./offsetSlice";

const store = configureStore({
  reducer: {
    offset: offsetSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
