import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ListSlice } from "./ListSlice/ListSlice";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    mainList : ListSlice.reducer,
});

const persistConfig ={
    key : "root",
    storage,
}

const persistedReducer  = persistReducer(persistConfig,rootReducer);
const store = configureStore({
    reducer : persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware:[thunk],
});


export default store;