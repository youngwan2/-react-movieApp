import { createSlice } from "@reduxjs/toolkit";


export const sortbySearchSlice = createSlice({
    name: 'searchData',
    initialState:{data:''},
    reducers : {
        sortbySearchData(state,action){
            state.data = action.payload
        }
    }
});

export let {sortbySearchData} = sortbySearchSlice.actions