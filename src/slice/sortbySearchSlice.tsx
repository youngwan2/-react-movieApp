import { createSlice } from "@reduxjs/toolkit";

export const sortBySearchSlice = createSlice({
  name: "searchData",
  initialState: {
    data: "",
    genre: "",
  },
  reducers: {
    sortBySearchData(state, action) {
      state.data = action.payload;
    },
  },
});

export let { sortBySearchData } = sortBySearchSlice.actions;
