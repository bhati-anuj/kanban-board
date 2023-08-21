import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loginUser: {},
  },
  reducers: {
    createAccount(state, action) {
      state.users.push(action.payload);
    },

    addLoginUser(state, action) {
      state.loginUser = action.payload;
    },
  },
});

export { UserSlice };
export const { createAccount, addLoginUser } = UserSlice.actions;
