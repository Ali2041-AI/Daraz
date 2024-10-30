import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/authService'
import {logInUser,logOutUser,LogInSeller,LogOutSeller,setStoreData} from './store/darazSlice'
import Home from './Pages/Home'
import Store from './Pages/Store'
import sellerAccountService from './appwrite/sellerAccountService'


function App() {



  const dispatch=useDispatch();
  const sellerData=useSelector((state)=>state.userData.sellerData);
  console.log(sellerData);


  useEffect(()=>{

    authService.getLogInUser()
    .then(
      (res)=>{
        if(res){
        dispatch(logInUser({...res}))
        const userID=res.$id;
        sellerAccountService.getSellerData(userID)
        .then((res)=>{
         if(res.total===1){
          const sellerData=res.documents[0];
          dispatch(LogInSeller({...sellerData}))
          sellerAccountService.getStoreData(sellerData)
          .then((data)=>{
            if(data.total===1){
              const storeData=data.documents[0];
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

  },[])




  return (
    <>
    <Home />
    <Store />

    
    </>
  )
}

export default App
