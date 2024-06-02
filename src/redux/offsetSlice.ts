import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offsetNumber: 0,
};

export const offsetSlice = createSlice({
  name: "offset",
  initialState,
  reducers: {
    toNext: (state) => {
      state.offsetNumber += 10;
    },
    toPrevious: (state) => {
      if (state.offsetNumber <= 0) {
        alert("最新のレビューページです");
      } else {
        state.offsetNumber -= 10;
      }
    },
  },
});

export const { toNext, toPrevious } = offsetSlice.actions;
