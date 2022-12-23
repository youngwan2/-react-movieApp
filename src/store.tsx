import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/movieSlice";
import { sortbySearchSlice } from "./slice/sortbySearchSlice";
import { detailTapsSlice } from "./slice/detailTapsSlice";

   

export default configureStore({
    reducer :{
        movies : movieSlice.reducer,
        sortbySearch : sortbySearchSlice.reducer,
        detailTaps: detailTapsSlice.reducer
     }
});

