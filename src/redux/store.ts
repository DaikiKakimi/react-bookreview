import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { offsetSlice } from "./offsetSlice";
import { userSlice } from "./userSlice";
import { bookSlice } from "./bookSlice";

const store = configureStore({
  reducer: {
    offset: offsetSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    book: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
