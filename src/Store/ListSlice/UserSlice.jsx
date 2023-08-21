import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "user",
    initialState:[],
    reducers:{
        createAccount(state,action){
            
            state.push(action.payload);
        }
    }
})

export {UserSlice};
export const {createAccount} = UserSlice.actions;