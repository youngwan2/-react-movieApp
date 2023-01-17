import { createSlice } from "@reduxjs/toolkit";


export const sortbySearchSlice = createSlice({
    name: 'searchData',
    initialState:{
        data:'',
        genre:''},
    reducers : {
        sortbySearchData(state,action){
            state.data = action.payload
            console.log(state.data)
        }
    }
});

export let {sortbySearchData} = sortbySearchSlice.actions