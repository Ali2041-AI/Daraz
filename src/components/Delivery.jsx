import { ClassNames } from "@emotion/react";
import { useSelector } from "react-redux";
import images from "../assets/Images";
import { useNavigate } from "react-router";

function Delivery({productID}){



    const userAddresses=useSelector(state=>state.userData?.userAddresses?.address);
    const parsedAddresses=userAddresses?.map((address)=>JSON.parse(address));
    const defaultAddress=parsedAddresses?.filter((address)=>address.default);






    const currentDate = new Date();
    const date = currentDate.getDate(); 
    const month = currentDate.getMonth() ;
    const months = [
        "Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ]; 

    

    const expectedDeliveryDate=`${(date+4)%31}-${(date+5)%31} ${months[month]}` 


    const navigate=useNavigate();


    return(
        <>

       <div className="bg-white cursor-pointer mt-2 p-4"  onClick={()=>navigate(`/addressPage?productID=${productID}`)} >

        <div className="flex gap-8 items-center" >
            <span className="self-start text-sm opacity-65 tracking-wide" >Delivery</span>


       {userAddresses
       ?
       <div className="flex  gap-2" >

       <div className="text-[14px] flex  gap-1 flex-col" >
        <span className="text-[#F85606] text-[13px]" >{defaultAddress[0].province}, {defaultAddress[0].city} - {defaultAddress[0].completeAddress}   </span>
        <span className="text-[13px]" >Standard Delivery,Guaranted by {expectedDeliveryDate}</span>
       </div>
       <span className="self-center  mt-6 text-sm font-bold text-[13px]" >Rs.145</span>
       <img className="w-4 h-4 cursor-pointer mr-4  text-[13px]" src={images.iconLeft} alt="" />
       </div>
 
       

       :
       <div className="flex  gap-2" >

       <div className="text-[14px] flex  gap-1 flex-col" >
        <span className="text-[#F85606] text-[13px]" >Sindh, Karachi - Gulshan-e-Iqbal, Block 15   </span>
        <span className="text-[13px]">Standard Delivery,Guaranted by {expectedDeliveryDate}</span>
       </div>
       <span className="self-center  mt-6 text-[13px] font-bold" >Rs.145</span>
       <img className="w-4 h-4 cursor-pointer mr-4 text-[13px]" src={images.iconLeft} alt="" />
       </div>
 
       
    }
        </div>

       </div>
     

        
        </>
    )




}

export default Delivery;