import { useState } from "react";
import authService from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { logInUser, logOutUser } from "../store/darazSlice";


function Login(){





    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("");
    const dispatch=useDispatch();



    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            if(email.trim()!=="" && pass.trim()!==""){
                authService.loginUser({email,pass})
                .then((res)=>{
                    if(res){
                        dispatch(logInUser({...res}))
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
            
        setEmail("");
        setPass("");




    }




    return(
        <>
        <form onSubmit={handleSubmit}>
        <label >Email:</label>
            <input type="text"  placeholder="Email..." value={email} onChange={e=>setEmail(e.target.value)}  />
            <label >Password:</label>
            <input type="password"  placeholder="Password..." value={pass} onChange={e=>setPass(e.target.value)}  />
            <button type="submit">Login</button>
        </form>
        
        </>
    )











}

export default Login;