import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/movieSlice";
import {
  sortBySearchSlice,
  paginationDisplaySlice,
} from "./slice/sortbySearchSlice";
import detailTapsSlice from "./slice/DetailTapsSlice"

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    sortBySearch: sortBySearchSlice.reducer,
    detailTaps: detailTapsSlice,
    isDisplayed: paginationDisplaySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
