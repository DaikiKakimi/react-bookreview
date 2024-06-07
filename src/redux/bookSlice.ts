import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = bookSlice.actions;
