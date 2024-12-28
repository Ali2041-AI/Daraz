import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import sellerAccountService from "../appwrite/sellerAccountService";
import images from "../assets/Images";
import store from "../store/store";
import QuerieReply from "../components/QuerieReply";
import { useLocation, useNavigate } from "react-router";
import FooterNavigationSeller from "../components/footerNavigationSeller";

function SellerQnaPage(){

    const location=useLocation(); 
    const {productData}=location.state || {};
    const storeData=useSelector((state)=>state.userData.storeData);
    const [queries,setQueries]=useState([]);
    const navigate=useNavigate();
    const [rerender,setRerender]=useState(false);

    useEffect(()=>{
        if(storeData!=null){
        sellerAccountService.getProductQueries("storeID",storeData?.$id)
        .then((res)=>{
            if(res.total>0){
                const data=res.documents;
                console.log(data);
                //queries not replied before
                const filtredQueies= data.filter((querie)=>querie.replySeenStatus?null:querie)
                .filter((item)=>item!==null)
                console.log(filtredQueies);
                setQueries(filtredQueies);
            }
        })
    }
    

    },[storeData,rerender])


   

    return(
        <>

        <div className="nav-area md:hidden">
                <div className="flex bg-white z-10 fixed border-b w-full p-2 items-center justify-between gap-4" >
                    <div className="flex items-center gap-4" >
                        <img src={images.backIcon} className="w-5  font-bold" alt="" onClick={()=>navigate("/account/storeDashboard")} />
                        <p className="font-bold mt-1">Customer Queries</p>
                    </div>
                </div>
            </div>
      
        <div className="md:pt-32 pt-12 p-4">
          <p className="mt-1 hidden md:block font-bold text-lg tracking-wider">Customer Queries</p>
            {
                Array.isArray(queries) && queries.map((querie)=>{
                    return(
                        <div key={querie?.$id}>

                            <QuerieReply querie={querie} setRerender={setRerender} />

                        </div>
                    )
                })
            }
           
        
        </div>
        <FooterNavigationSeller productData={productData} />
        </>
    )




}


export default SellerQnaPage