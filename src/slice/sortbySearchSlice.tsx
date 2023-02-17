import { createSlice } from "@reduxjs/toolkit";


export const sortBySearchSlice = createSlice({
    name: 'searchData',
    initialState:{
        data:'',
        genre:''},
    reducers : {
        sortBySearchData(state,action){
            state.data = action.payload
            console.log(state.data)
        }
    }
});

export let {sortBySearchData} = sortBySearchSlice.actions