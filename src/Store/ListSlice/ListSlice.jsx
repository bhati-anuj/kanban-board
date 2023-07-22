import { createSlice } from "@reduxjs/toolkit";


const ListSlice = createSlice({
    name:"list",
    initialState:[],
    reducers:{
        addMainList(state,action){

        }
    }
})

export {ListSlice} 
export const {addMainList} = ListSlice.actions;