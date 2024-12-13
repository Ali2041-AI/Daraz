import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/authService'
import {logInUser,logOutUser,LogInSeller,setProducts,setStoreData,setUserAddresses} from './store/darazSlice'
import Home from './Pages/Home'
import Store from './Pages/Store'
import sellerAccountService from './appwrite/sellerAccountService'
import Account from './Pages/AccountPage'
import { Outlet, useNavigate } from 'react-router'


function App() {



  
  const dispatch=useDispatch();
  const sellerData=useSelector((state)=>state.userData.sellerData);
  const logInStatus=useSelector((state)=>state.userData.loginStatus);
  const navigate=useNavigate();   
  


  useEffect(()=>{

    authService.getLogInUser()
    .then(
      (res)=>{
        if(res){
        dispatch(logInUser({...res}))
        const userID=res.$id;
        sellerAccountService.getAddressData(userID)
       .then((res)=>{
        if(res.total>0){
         dispatch(setUserAddresses({...res.documents[0]}));
        }
       })


        sellerAccountService.getSellerData(userID)
        .then((res)=>{
          console.log(res);
         if(res.total===1){
          const sellerData=res.documents[0];
          dispatch(LogInSeller({...sellerData}))
          console.log(sellerData);
          console.log("i am here")
          sellerAccountService.getStoreData(sellerData)
          .then((data)=>{
            if(data.total===1){
              const storeData=data.documents[0];
              console.log(storeData)
              dispatch(setStoreData({...storeData}))
            }
            else{
              return;
            }
        
          })
          .catch((error)=>{
            console.log(error);
          })


         }

        })
        
        }
      }
    )
    .catch(
      (error)=>{
        console.log(error);
      }
    )

  },[navigate])


  useEffect(()=>{
    sellerAccountService.getProductData()
    .then((res)=>{
      if(res.total>0){
        const productData=res.documents;
        console.log(productData);
        dispatch(setProducts([...productData]));
      }
    })
  },[])




  return (
    <>

   <Outlet />

    
    </>
  )
}

export default App
