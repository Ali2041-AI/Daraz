import { createSlice } from "@reduxjs/toolkit";


 const initialState={
    loginStatus:false,
    userData:null,
 }



const darazSlice=createSlice({
    name:'darazSlice',
    initialState,
    reducers:{
        logInUser:(state,action)=>{
            state.loginStatus=true;
            state.userData=action.payload;
        },
        logOutUser:(state)=>{
            state.loginStatus=false;
            state.userData=null;
        }

    }
})

export const {logInUser,logOutUser}=darazSlice.actions;
export default darazSlice.reducer;