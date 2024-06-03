import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "user",
  iconUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setIconUrl: (state, action) => {
      state.iconUrl = action.payload;
    },
  },
});

export const { setUserName, setIconUrl } = userSlice.actions;
