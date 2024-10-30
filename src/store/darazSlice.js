import { createSlice } from "@reduxjs/toolkit";


 const initialState={
    loginStatus:false,
    userData:null,
    isSeller:false,
    sellerData:null,
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
        },
        LogInSeller:(state,action)=>{
            state.isSeller=true;
            state.sellerData=action.payload;
        },
        LogOutSeller:(state)=>{
            state.isSeller=false;
            state.sellerData=null;
        },
    }
})

export const {logInUser,logOutUser,LogInSeller,LogOutSeller}=darazSlice.actions;
export default darazSlice.reducer;