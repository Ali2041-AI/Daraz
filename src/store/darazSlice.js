import { createSlice } from "@reduxjs/toolkit";


 const initialState={
    loginStatus:false,
    userData:null,
    isSeller:false,
    sellerData:null,
    storeData:null,
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
        }
    }
})

export const {logInUser,logOutUser,LogInSeller,LogOutSeller,setStoreData}=darazSlice.actions;
export default darazSlice.reducer;