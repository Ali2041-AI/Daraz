import { useState } from "react";
import authService from "../appwrite/authService";
function Signup(){


    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [name,setName]=useState("");


    const handleSubmit=async (e)=>{
        e.preventDefault();

        try {
            if(email.trim()!=="" && pass.trim()!=="" && name.trim()!==""){
                const user=await authService.SignUp({name,email,pass});
                console.log(user);
            }
        } catch (error) {
            console.log(error.message);
        }
        setName("");
        setEmail("");
        setPass("");

    }
    






    return(
        <>
          <form onSubmit={handleSubmit} >
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Name..." value={name} onChange={e=>setName(e.target.value)}  />
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Email..." value={email} onChange={e=>setEmail(e.target.value)}  />
            <label htmlFor="pass">Password:</label>
            <input type="password" id="pass" placeholder="Password..." value={pass} onChange={e=>setPass(e.target.value)}  />
            <button type="submit">Sign Up</button>

          </form>
        
        </>
    )







}

export default Signup;