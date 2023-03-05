import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/MovieSlice";
import { sortBySearchSlice,paginationDisplaySlice } from "./slice/SortBySearchSlice";
import { detailTapsSlice } from "./slice/DetailTapsSlice";

export default configureStore({
    reducer :{
        movies : movieSlice.reducer,
        sortBySearch : sortBySearchSlice.reducer,
        detailTaps: detailTapsSlice.reducer,
        isDisplayed : paginationDisplaySlice.reducer
     }
});

