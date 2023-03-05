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

export const paginationDisplaySlice = createSlice({
  name: "paginationDisplay",
  initialState: true,
  reducers: {
    isDisplay(state, action) {
      console.log(action.payload)
      return state = action.payload;
      
    },
  },
});

export const { sortBySearchData } = sortBySearchSlice.actions;
export const { isDisplay } = paginationDisplaySlice.actions;
