import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


 const initialState={
    loginStatus:false,
    userData:null,
    isSeller:false,
    sellerData:null,
    storeData:null,
    refreshProducts:false,
    allProducts:[]
 }



const darazSlice=createSlice({
    name:'darazSlice',
    initialState,
    reducers:{
        logInUser:(state,action)=>{
            state.loginStatus=true;
            state.userData=action.payload;
            console.log(state.userData);
        },
        logOutUser:(state)=>{
            state.loginStatus=false;
            state.userData=null;
            state.isSeller=false;
            state.sellerData=null;
            state.storeData=null;
        },
        LogInSeller:(state,action)=>{
            state.isSeller=true;
            state.sellerData=action.payload;

        },
        LogOutSeller:(state)=>{
            state.isSeller=false;
            state.sellerData=null;
        },
        setStoreData:(state,action)=>{
            state.storeData=action.payload;
        },
        changeRefreshProducts:(state)=>{
           state.refreshProducts=!state.refreshProducts;
        },
        setProducts:(state,action)=>{
            state.allProducts=action.payload;

        }
    }
})

export const {logInUser,logOutUser,setProducts,LogInSeller,LogOutSeller,setStoreData,changeRefreshProducts}=darazSlice.actions;
export default darazSlice.reducer;