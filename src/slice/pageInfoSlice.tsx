import { createSlice } from "@reduxjs/toolkit";

export const pageInfoSlice = createSlice({
    name : 'pageInfo',
    initialState : 1,
    reducers : {
        pageInfoCommunicator(state, action){
            return state = Number(action.payload);
        }
    }
}
);

export let {pageInfoCommunicator} = pageInfoSlice.actions;