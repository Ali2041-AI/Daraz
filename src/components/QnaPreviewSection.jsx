import { useEffect, useState } from "react"
import sellerAccountService from "../appwrite/sellerAccountService";
import { useNavigate } from "react-router";
import SingleQA from "./SingleQA";

function QnaPreviewSection({productID}){


    

    const [qna,setQna]=useState([]);
    const [buttonClick,setButtonClick]=useState(false);
    const navigate=useNavigate();

    


    useEffect(()=>{

        sellerAccountService.getProductQueries("productID",productID)
        .then((res)=>{
            if(res.total>0){  //got some data from api
                setQna(res.documents);
            }
        })
        .catch((error)=>{
            console.log(error.message);
        })
    },[])



    const openQnaSection=(e)=>{
     setButtonClick(true);

     navigate(`/product-qna/${productID}`);

     setButtonClick(false);
    }









    return(
        <>
      <div className="bg-white mt-2 p-4 md:p-0" >
        <div className="flex justify-between" >
        <p  className="self-start text-sm opacity-65 tracking-wide mb-6 md:text-lg "   >Questions about this product({qna.length})</p>
        <button className="self-start text-sm opacity-65 tracking-wide mb-6 text-[#ff3d00] font-bold "    onClick={()=>navigate(`/product-qna/${productID}`)} >View All</button>
        </div>
        {
            qna?.total===0
            ?
            <div >
                <p className="self-start text-[12.8px] opacity-65 tracking-wide mx-auto text-center md:text-lg"  >There are no questions yet.</p>
                <p className="self-start text-[12.8px] opacity-65 tracking-wide mx-auto text-center md:text-lg">ask the seller now and thier answer will show here.</p>
                <p className="mx-auto w-[98%] mt-6 border-t border-black border-opacity-15"></p>

            </div>
            :
            <SingleQA 
            message={qna[0]?.querie} 
            customerName={qna[0]?.customerName}
            createdAt={qna[0]?.$createdAt}
            reply={qna[0]?.reply}
            repliedAt={qna[0]?.$updatedAt}
             />
        }
        <div className="flex justify-center mt-4" >
           <button className={` text-sm font-bold ${buttonClick?'text-blue-700':"text-[#FF6700]"} cursor-pointer`} onClick={openQnaSection}  >ASK QUESTIONS</button>
        </div>
      </div>
        </>
    )




}

export default QnaPreviewSection