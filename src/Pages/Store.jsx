import { useState } from "react";
import { useSelector } from "react-redux";
import sellerAccountService from "../appwrite/sellerAccountService";

function Store(){


    const [sellerName,setSellerName]=useState("")
    const [sellerPhoneNo,setsellerPhoneNo]=useState("")
    const [address,setSellerAddress]=useState('');
    const [cnic,setCnic]=useState("");
    const [error,setError]=useState("");


    const [storeName,setStoreName]=useState("");
    const [file,setFile]=useState([]);






    const sellerID=useSelector((state)=>state.userData.sellerData)?.$id;
    const user=useSelector((state)=>state.userData.userData);
    const userID=user?.$id;
    const hanldeSellerAccountCreation=async (e)=>{
        e.preventDefault();
        setError("");
        console.log(address);
        if(userID){
            try {
                sellerAccountService.createSellerAccount({sellerName,sellerPhoneNo,address,cnic,userID})
            } catch (error) {

                console.log(error);
                
            }


        }
        setError("Please Login First!!");
    }
    const handleStoreCreation=(e)=>{
        e.preventDefault();
        if(!file){
            setError("No File Uploaded!!");
            return;
        }
        else{
            try {
                sellerAccountService.addImage(file)
                .then((res)=>{
                    if(res){
                        try {
                            sellerAccountService.createStore(storeName,res,sellerID);
                        } catch (error) {
                            console.log(error);
                            
                        }

                    }

                })
                ;
            } catch (error) {
                console.log(error);
                
            }
        }





    }







    return(
        <>
        <form onSubmit={hanldeSellerAccountCreation}>
        <h2>Create Seller Account</h2>
        <input type="text" placeholder="Name.." value={sellerName} onChange={e=>setSellerName(e.target.value)} />
        <input type="number" placeholder="Phone" value={sellerPhoneNo} onChange={e=>setsellerPhoneNo(e.target.value)} />
        <input type="text" placeholder="addres.." value={address} onChange={e=>setSellerAddress(e.target.value)} />
        <input type="number" placeholder="cnic.." value={cnic} onChange={e=>setCnic(e.target.value)} />
        <button type="submit">Create Seller Account</button>
        <p>{error}</p>

        </form>
        <form onSubmit={handleStoreCreation} className="mb-24">
        <h2>Input the information to create your store</h2>
        <input type="text" placeholder="Store Name..." value={storeName} onChange={e=>setStoreName(e.target.value)} />
        <input type="file" accept="image/png , image/jpg , image/jpeg, image/gif"  onChange={e=>setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-600 text-white rounded-md px-2 py-1 ml-5" >create Store</button>
        

        </form>

        <h2>Add a Product in the Database</h2>
        </>
    )





}
export default Store;