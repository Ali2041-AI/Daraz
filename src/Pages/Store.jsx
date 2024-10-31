import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sellerAccountService from "../appwrite/sellerAccountService";
import {logInUser,logOutUser,LogInSeller,LogOutSeller,setStoreData} from '../store/darazSlice'


function Store(){

// Data realted to seller
    const [sellerName,setSellerName]=useState("")
    const [sellerPhoneNo,setsellerPhoneNo]=useState("")
    const [address,setSellerAddress]=useState('');
    const [cnic,setCnic]=useState("");
    const [error,setError]=useState("");

//Data related to Store Creation
    const [storeName,setStoreName]=useState("");
    const [file,setFile]=useState([]);

//Data related to Product Creation
    const [productTitle,setProductTitle]=useState("");
    const [discountedPrice,setDiscountedPrice]=useState("");
    const [sold,setSoldAmount]=useState("");
    const [stock,setStock]=useState("");
    const [colors,setColors]=useState([]);
    const [singleColor,setSingleColor]=useState("");
    const [singleSize,setSingleSize]=useState("");
    const [sizes,setSizes]=useState([]);
    const [productImage,setProductImage]=useState([]);
    const [productImages,setProductImages]=useState([]);
    const [singleCategory,setSingleCategory]=useState("");
    const [category,setCategory]=useState([]);
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");


    const dispatch=useDispatch();





    let storeID=useSelector((state)=>state.userData.storeData);
    storeID=storeID?.$id;
    console.log(storeID);
    const sellerID=useSelector((state)=>state.userData.sellerData)?.$id;
    const user=useSelector((state)=>state.userData.userData);
    const userID=user?.$id;
    const hanldeSellerAccountCreation=async (e)=>{
        e.preventDefault();
        setError("");
        if(userID){
            try {
                sellerAccountService.createSellerAccount({sellerName,sellerPhoneNo,address,cnic,userID})
                .then((sellerData)=>{
                    dispatch(LogInSeller(sellerData));
                })
                .catch((error)=>{
                    console.log(error);
                })
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
                            sellerAccountService.createStore(storeName,res,sellerID)
                            .then((storeData)=>{
                                dispatch(setStoreData({...storeData}));
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
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
    const addColor=()=>{
        if(singleColor.trim()!==""){
            setColors(prev=>[...prev,singleColor]);
        }
        setSingleColor("");
    }

    const addSize=()=>{
        if(singleSize.trim()!==""){
            setSizes(prev=>[...prev,singleSize]);
        }
        setSingleSize("");
    }

    const addImage=()=>{
        
            sellerAccountService.addImage(productImage)
            .then((fileID)=>{
                setProductImages((prev)=>[...prev,fileID])
                console.log(productImages);
            })
            .catch((error)=>{
                console.log(error);
            })
        
        setProductImage([]);

    }

    const addCategory=()=>{
        if(singleCategory.trim()!==""){
            setCategory((prev)=>[...prev,singleCategory]);
        }
        setSingleCategory("");
    }

    const addProduct=(e)=>{
        e.preventDefault();

        sellerAccountService.createNewProduct({discountedPrice,productTitle,sold,stock,colors,sizes,category,storeID,description,price,productImages})

    }







    return(
        <>
        <div className="mb-24">

            <form onSubmit={hanldeSellerAccountCreation}>
            <h2>Create Seller Account</h2>
            <input type="text" placeholder="Name.." value={sellerName} onChange={e=>setSellerName(e.target.value)} />
            <input type="number" placeholder="Phone" value={sellerPhoneNo} onChange={e=>setsellerPhoneNo(e.target.value)} />
            <input type="text" placeholder="addres.." value={address} onChange={e=>setSellerAddress(e.target.value)} />
            <input type="number" placeholder="cnic.." value={cnic} onChange={e=>setCnic(e.target.value)} />
            <button type="submit">Create Seller Account</button>
            <p>{error}</p>

            </form>
            <form onSubmit={handleStoreCreation} >
            <h2>Input the information to create your store</h2>
            <input type="text" placeholder="Store Name..." value={storeName} onChange={e=>setStoreName(e.target.value)} />
            <input type="file" accept="image/png , image/jpg , image/jpeg, image/gif"  onChange={e=>setFile(e.target.files[0])} />
            <button type="submit" className="bg-blue-600 text-white rounded-md px-2 py-1 ml-5" >create Store</button>
            

            </form>

            <form onSubmit={addProduct} className="my-8">
              <h2>Add a Product in the Database</h2>
              <input type="text" placeholder="product title...." value={productTitle} onChange={e=>setProductTitle(e.target.value)} />
              <input type="number" placeholder="Discounted Price..." value={discountedPrice} onChange={e=>setDiscountedPrice(e.target.value)}/>
              <input type="number" placeholder="Sold..." value={sold} onChange={e=>setSoldAmount(e.target.value)}/>
              <input type="number" placeholder="stock..." value={stock} onChange={e=>setStock(e.target.value)} />
              <div>
              <input type="text" placeholder="Color.." value={singleColor} onChange={e=>setSingleColor(e.target.value)}/>
             <div>
              {Array.isArray(colors) && colors.map((color)=>(
                <span key={color} >{color}</span>
              ))}
            </div> 

              </div>
              <button type="button" onClick={addColor}>Add Color</button>

             <div>
              <input type="text" placeholder="size..." value={singleSize} onChange={e=>setSingleSize(e.target.value)} />
              <div>
              {Array.isArray(sizes) &&  sizes.map((size)=>(
                <span key={size} >{size}</span>
              ))}
              </div>
            </div> 
              <button type="button" onClick={addSize}>Add Size</button>

             <div className="my-6 ">
              <div className="ImageDisplayingArea flex">
                {Array.isArray(productImages) && productImages.map((imageID)=>(
                 
                   <img key={imageID} className="w-12" src={sellerAccountService.getImagePreview(imageID)} alt="" />  
                ))}
              </div>
              <input type="file" accept="image/png , image/jpg ,image/webp , image/jpeg, image/gif"  onChange={e=>setProductImage(e.target.files[0])} />
              <button type="button" onClick={addImage} className="bg-red-600 rounded-full text-3xl px-4 py-2 hover:bg-red-500 text-white">+</button>
               
             </div>

             <div>
              <input type="text" placeholder="category..." value={singleCategory} onChange={e=>setSingleCategory(e.target.value)} />
              <div>
              {Array.isArray(category) &&  category.map((cate)=>(
                <span key={cate} >{cate}</span>
              ))}
              </div>
             </div>
              <button type="button" onClick={addCategory}>Add Category</button>


              <textarea placeholder="Description..." value={description} onChange={e=>setDescription(e.target.value)} name="" id=""></textarea>
              <input type="text" placeholder="price..." value={price} onChange={e=>setPrice(e.target.value)} />
              
              <button type="submit" className="bg-red-600 text-white rounded-md px-2 py-1">Add Product</button>
            </form>
        </div>

        </>
    )





}
export default Store;