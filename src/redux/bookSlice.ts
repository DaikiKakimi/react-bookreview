import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { useEffect } from "react";
// import { APIurl } from "../const";
// import { useDispatch, useSelector } from "react-redux";

const initialState = {
  reviews: [],
};

// const offset = useSelector((state: RootState) => state.offset.offsetNumber);
// const dispatch = useDispatch();

// useEffect(() => {
//   axios
//     .get(`${APIurl}/public/books?offset=${offset}`)
//     .then((res) => {
//       console.log(res.data);
//       dispatch(setReviews(res.data));
//     })
//     .catch((err) => {
//       console.log(err);
//       alert("レビュー一覧を取得できませんでした");
//     });
// }, [dispatch, offset]);

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
