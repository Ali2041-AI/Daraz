import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/authService";
import sellerAccountService from "../appwrite/sellerAccountService";

const initialState = {
  loginStatus: false,
  userData: null,
  userAddresses: null,
  isSeller: false,
  sellerData: null,
  storeData: null,
  refreshProducts: false,
  allProducts: [],
  loading: false,
  error: null,
};

// Thunks for async API calls
export const fetchUserData = createAsyncThunk("daraz/fetchUserData", async (_, { dispatch }) => {
  const user = await authService.getLogInUser();
  if (user) {
    dispatch(logInUser({ ...user }));

    const userID = user.$id;

    const addressData = await sellerAccountService.getAddressData(userID);
    if (addressData.total > 0) {
      dispatch(setUserAddresses({ ...addressData.documents[0] }));
    }

    const sellerData = await sellerAccountService.getSellerData(userID);
    if (sellerData.total === 1) {
      const sellerInfo = sellerData.documents[0];
      dispatch(LogInSeller({ ...sellerInfo }));

      const storeData = await sellerAccountService.getStoreData(sellerInfo);
      if (storeData.total === 1) {
        dispatch(setStoreData({ ...storeData.documents[0] }));
      }
    }
  }
});

export const fetchProducts = createAsyncThunk("daraz/fetchProducts", async () => {
  const productData = await sellerAccountService.getProductData();
  if (productData.total > 0) {
    return productData.documents;
  }
  return [];
});

const darazSlice = createSlice({
  name: "darazSlice",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.loginStatus = true;
      state.userData = action.payload;
    },
    logOutUser: (state) => {
      state.loginStatus = false;
      state.userData = null;
      state.isSeller = false;
      state.sellerData = null;
      state.storeData = null;
    },
    LogInSeller: (state, action) => {
      state.isSeller = true;
      state.sellerData = action.payload;
    },
    LogOutSeller: (state) => {
      state.isSeller = false;
      state.sellerData = null;
    },
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },
    changeRefreshProducts: (state) => {
      state.refreshProducts = !state.refreshProducts;
    },
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setUserAddresses: (state, action) => {
      state.userAddresses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      });
  },
});

export const {
  logInUser,
  logOutUser,
  setProducts,
  LogInSeller,
  LogOutSeller,
  setStoreData,
  changeRefreshProducts,
  setUserAddresses,
} = darazSlice.actions;

export default darazSlice.reducer;
