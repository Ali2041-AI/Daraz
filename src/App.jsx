import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/authService'
import {logInUser,logOutUser} from './store/darazSlice'
import Home from './Pages/Home'

function App() {



  const dispatch=useDispatch();


  useEffect(()=>{

    authService.getLogInUser()
    .then(
      (res)=>{
        if(res){
          console.log(res);
        dispatch(logInUser({...res}))
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

    
    </>
  )
}

export default App
