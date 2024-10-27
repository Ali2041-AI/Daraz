import { configureStore } from "@reduxjs/toolkit";
import darazReducer from './darazSlice'


const store=configureStore({
    reducer:{
        userData:darazReducer
    }
})

export default store;

