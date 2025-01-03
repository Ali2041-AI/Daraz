import { useNavigate, useParams } from "react-router";
import images from "../assets/Images";
import { useEffect, useState } from "react";
import sellerAccountService from "../appwrite/sellerAccountService";
import { useSelector } from "react-redux";
import SingleQA from "../components/SingleQA";
import { set } from "react-hook-form";
import { ClipLoader } from "react-spinners";

function ProductQna(){


    const {productID}=useParams();
    const [productData,setProductData]=useState([]);
    const [qnaData,setQnaData]=useState([]);
    const [message,setMessage]=useState("");
    const [buttonLoading,setButtonLoading]=useState(false);
    const userData=useSelector(state=>state.userData?.userData);
    const storeID=productData?.storeID;
    const [loading,setLoading]=useState(false);


    const navigate=useNavigate();



    useEffect(()=>{
        setLoading(true);

        sellerAccountService.getProductQueries("productID",productID)
        .then((res)=>{
            if(res.total>0){  //got some data from api
                console.log("We have got these Questions: ",res);

            }
            setQnaData(res.documents);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error.message);
            setLoading(false);
        })

        sellerAccountService.getProductData(productID)
        .then((res)=>{
            if(res.total>0){
                setProductData(res.documents[0]);
            }
        })
    },[])


    const sendMessage=()=>{

        setButtonLoading(true);
        if(message.trim()!==""){
            sellerAccountService.sendProductQuerie({userID:userData?.$id,productID,customerName:userData?.name,storeID,querie:message})
            .then((res)=>{
              setLoading(true);
                sellerAccountService.getProductQueries("productID",productID)
                .then((res)=>{
                  if(res.total>0){
                    console.log(res.documents);
                    setQnaData(res.documents);
                    setLoading(false);
                  }
                })
            })


        }

        setMessage("");
        setButtonLoading(false);



    }




    return (
        <>
         <div className="bg-gradient-to-r md:hidden  z-40  fixed w-full  from-[#F85606] to-[#F87606] overflow-y-hidden p-3 text-white flex items-center gap-2">
            <img
              src={images.backIconQA}
              className="w-4 h-4"
              alt=""
              onClick={() => navigate(`/productDisplay/${productID}`)}
            />
            <p className="font-bold text-[18px]">Q&A</p>
          </div>


        {
          loading
          ? <div className="absolute top-[50%] left-[50%] -translate-x-[50%] justify-center min-h-screen" >
          <ClipLoader color="#F85606"  size={50} />
      </div>

          :
<div className="md:mt-20">

         
          {qnaData.length === 0 ? (
            <div className="flex justify-center bg-[#EFF0F5] items-center h-screen  text-sm opacity-70">
              <div className="text-center">
                <p>There are no questions yet.</p>
                <p>Ask the seller now and their answer will show here.</p>
              </div>
            </div>
          ) : 
          (
            <div className="pt-16" >
                <p className="opacity-50 mb-4 pl-4" >Questions about this product ({qnaData.length})</p>
                <div>

                    {Array.isArray(qnaData) && qnaData.map((singleQuestion)=>{
                        return(
                          <div key={singleQuestion?.$id} >
                            <SingleQA 
                            message={singleQuestion?.querie} 
                            customerName={singleQuestion?.customerName}
                            createdAt={singleQuestion?.$createdAt}
                            reply={singleQuestion?.reply}
                            repliedAt={singleQuestion?.$updatedAt}
                            />
                        </div>

                        )
                    })}



                   
                </div>
            </div>
          )
          }




</div>

}


        

            <div className=" fixed p-2 flex bg-white w-full bottom-0 z-40"  >
                 <input type="text" value={message} onChange={e=>setMessage(e.target.value)} className="bg-[#EFF0F5] rounded-xl px-4 py-3 outline-none border-none flex-1"  placeholder="Enter your question(s) here" />
                 <button className={`  px-6 rounded-full py-1 text-white ${buttonLoading?"bg-blue-600":"bg-[#F85606]"}  `} onClick={sendMessage} >Send</button>
            </div>


        
        </>
      );
      





}

export default ProductQna