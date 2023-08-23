import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginUser: {},
    loginKey : false,
  },
  reducers: {
    createAccount(state, action) {
      state.users.push(action.payload);
    },

    addLoginUser(state, action) {
      state.loginUser = action.payload;
      state.loginKey = true;
    },

    logoutUser(state,action){
      
      state.loginKey = action.payload;
      console.log(state.loginKey);
    }
  },
});

export { UserSlice };
export const { createAccount, addLoginUser,logoutUser } = UserSlice.actions;
