import { useNavigate } from "react-router";
import images from "../assets/Images";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { checkboxClasses } from "@mui/material";
import CartProductPreview from "./CartProductPreview";

function CartPage(){

    const navigate=useNavigate();
    const userData=useSelector((state)=>state.userData)?.userData;

    console.log(userData);
    //all data including cartID etc
    const [cartProductsData,setCartProductsData]=useState([]);

    //only products data ID,Quantity
    const [cartProductArray,setCartProuctArray]=useState([]);
    // console.log(cartProductArray);
    console.log("This is what i have to see: " , cartProductArray);

    //complete Product Data fetched through IDS
     
    const [productsData,setProductsData]=useState([]);
    console.log(productsData);


    const [total,setTotal]=useState(0);

    
    const [savedAmount,setSavedAmount]=useState(0);
    const [selectedProducts,setSelectedProducts]=useState([]);

    console.log("these are the selected Products: ", selectedProducts);
    const [allCheckbox,setAllCheckbox]=useState(false);



    useEffect(()=>{
     
        sellerAccountService.getCartProductData(userData?.$id)
        .then((res)=>{
            if(res.total>0){
                console.log(res);
            setCartProductsData(res.documents[0]);
            //Stringify data to JSON
            const JSONProducts=StringifyToJsonArrayConverter(res.documents[0]?.products);
            setCartProuctArray(JSONProducts)
            console.log(JSONProducts);

            //IDS from product Data
            const onlyProductIDS=JSONProducts.map((item)=>item.productID);
            //fetch all the product with these IDS
            console.log("These are the only product IDS: ", onlyProductIDS);
            sellerAccountService.getProductData(onlyProductIDS)
            .then((res)=>{
                 
                const products=res.documents;
                const updatedProducts = products.map((item) => {
                    // Find the matching product in JSONProducts by productID
                    const matchedProduct = JSONProducts.find((product) => product.productID === item.$id);
                  
                    // If a match is found, update the quantity
                    return matchedProduct ? { ...item, quantity: matchedProduct.quantity } : item;
                  });
                res.total>0 && setProductsData(updatedProducts);
            })
        }
        })
        .catch((errr)=>{
            console.log(errr);
        })


    }
    ,[]
)

useEffect(()=>{

    console.log("here");
    
    let sum=0;
    let tempSum;
    let savedAmount=0;
    let tempSaved;

    selectedProducts.forEach((product)=>{
        const matchedProduct=productsData.find((item)=>item.$id===product?.productID);
        if(matchedProduct){
            tempSum=matchedProduct?.price;
            tempSum=tempSum*product?.quantity;
            tempSaved=matchedProduct?.discountedPrice;
            tempSaved=tempSaved*product?.quantity;
        }
        sum+=tempSum;
        savedAmount+=tempSaved;
        tempSum=0;
        tempSaved=0;
    })

    setSavedAmount(savedAmount);
    setTotal(sum);


},[selectedProducts])



   const handleChange=()=>{
    if(!allCheckbox){
        setSelectedProducts(cartProductArray);
    }
    else{
        setSelectedProducts([]);

    }
    setAllCheckbox((prev)=>!prev);
   }

   const updateQuantity=(productID,quantity)=>{

    //   console.log("here")
      const newarr=cartProductArray.map((item)=>item.productID===productID?{...item,quantity:quantity}:item)
      setCartProuctArray(newarr);


      //for updating selected Products

      const updatedSelectedArray=selectedProducts.map((item)=>{

        const matchedItemFromAllProducts=newarr.find((product)=>product.productID===item.productID);

        return matchedItemFromAllProducts ? {...matchedItemFromAllProducts}:item;


      })
       
      setSelectedProducts(updatedSelectedArray);

      
      setTimeout(()=>{
        sellerAccountService.updateCartProductData({cartID:cartProductsData?.$id,products:JsonToStringifyArrayConverter(newarr)})
      .then((res)=>{
        console.log("Is updated in server: " , res);
      })
      },6000)
     
    
   }


   const StringifyToJsonArrayConverter=(ArrayToConvert)=>{
      return Array.isArray(ArrayToConvert) && ArrayToConvert.map((item)=> JSON.parse(item));

   }

   const JsonToStringifyArrayConverter=(ArrayToConvert)=>{
    return Array.isArray(ArrayToConvert) && ArrayToConvert.map((item)=> JSON.stringify(item));

   }

   const handleSelectedProducts = (productID) => {
    if (selectedProducts.find((item) => item.productID === productID)) {
      console.log("I am already selected!");
      // Create a new array by filtering out the deselected product
      setSelectedProducts(selectedProducts.filter((item) => item.productID !== productID));
    } else {
      console.log("I am selecting for the first time!");
      // Create a new array by spreading the old array and adding the new product
      const newProduct = cartProductArray.find((item) => item.productID === productID);
      if (newProduct) {
        setSelectedProducts([...selectedProducts, newProduct]);
      }
    }
  };
  


  const deleteSelectedItems=()=>{


    if(selectedProducts.length===cartProductArray.length){
        sellerAccountService.deleteCart(cartProductsData?.$id)
        setProductsData([]);
        setCartProuctArray([]);
        setSelectedProducts([]);
    }
    else if(selectedProducts.length!==cartProductArray.length){
        //delete specific products
         console.log(selectedProducts);
        let tempArray=productsData.filter((product)=>{
            if(!selectedProducts.some((item)=>item.productID===product.$id)){
               return product;
            }
        })

        setProductsData(tempArray);
        console.log(tempArray);

        tempArray=cartProductArray.filter((product)=>{
            if(!selectedProducts.some((item)=>item.productID===product.productID)){
                return product;
            }
        })
        setCartProuctArray(tempArray);
        setSelectedProducts([]);
        //now update the database also

        sellerAccountService.updateCartProductData({cartID:cartProductsData?.$id,products:JsonToStringifyArrayConverter(tempArray)});


    }


    




  }


   




    return(
        <>
        <div className="bg-[#f5f5f5] min-h-screen" >

         <div className="nav-area">
            <div className="flex bg-white fixed border-b w-full p-2 items-center justify-between gap-4" >
                <div className="flex items-center gap-4" >
                    <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/")} />
                    <p className="font-bold mt-1">My Cart</p>
                </div>
                <div onClick={deleteSelectedItems} className="delete-icon" style={{width: '4.9vw', height: '4.8vw', fill: 'rgb(0, 0, 0)', stroke: 'rgb(0, 0, 0)', strokeWidth: 2}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 36 36" width="100%" height="100%" style={{display: 'block'}}><path d="m9 11 1.544-4.632A2 2 0 0 1 12.441 5h11.117a2 2 0 0 1 1.898 1.368L27 11m0 0h2m-2 0H7m-2 0h2m24 0h-2m0 0-.905 18.1a2 2 0 0 1-1.997 1.9H9.903a2 2 0 0 1-1.998-1.9L7 11m11 4v12m5.5-12-1 12m-10-12 1 12"></path></svg></div>
            </div>

            <div className="main-area  pt-14" >

                {
                    cartProductArray.length>0
                    ?<div className="p-3 flex flex-col gap-3" >

                        {Array.isArray(productsData) && productsData.map((product)=>{
                            return(
                                <div key={product?.$id} className="flex gap-4 items-center" >
                                  <input type="checkbox" checked={selectedProducts.some((item)=>item.productID===product?.$id)} onChange={()=>handleSelectedProducts(product?.$id)} />
        
                                  <CartProductPreview product={product} updateQuantity={updateQuantity}/>
                               
                                </div>
                            )
                        })}



                    </div>
                    :
                    <div>
                      {
                        userData?
                        <p className="absolute top-[50%] left-[50%] -translate-x-[50%] text-[#F85606] font-bold tracking-wider text-center  w-full" >No products in the Cart</p>
                        :
                      <div className="text-[#F85606]  font-bold absolute top-[50%] left-[50%] -translate-y-[50%] pointer-cursor  -translate-x-[50%]" >
                        <p className="mb-2" >Log in first</p>
                        <button className="border-[1px] px-4 py-1 border-[#F85606]" >Log in</button>
                         </div>

}


                    </div>
                }

            </div>
            <div className="footer-area flex justify-between w-full p-4 items-center fixed bottom-0 bg-white ">
                <div>
                    <input type="checkBox" id="allcheckBox" checked={selectedProducts.length!==0 &&  selectedProducts.length===cartProductArray.length}   onChange={handleChange} />
                    <label htmlFor="allcheckBox" className="ml-1">All</label>
                </div>
                
                <div className="flex items-center" >
                    <div className="flex flex-col">
                        <div className="flex" >
                            <p className="font-bold mr-2 " >Total: </p>
                            <p className="text-[#FE4860] font-bold mr-2" >Rs.{total}</p>
                        </div>
                        <div className="flex self-end" >
                            <p className="text-[#FE4860] text-[10px] mr-2">Saved </p>
                            <p className="text-[#FE4860] text-[10px] mr-2">Rs.{savedAmount}</p>
                        </div>
                    </div>
                    <button className="bg-[#F85606] text-white font-semibold rounded-md px-2 py-1" >Check out({selectedProducts.length})</button>
                </div>

            </div>

         </div>

        </div>

        </>
    )



}

export default CartPage;