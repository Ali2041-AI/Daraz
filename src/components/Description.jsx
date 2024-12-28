
function Description({Description,productImages}){

    return(
        <>
        {Description
        ? <div className="bg-white mt-2 p-4" >
            <p className="self-start text-sm opacity-65 tracking-wide mb-6 md:text-lg md:font-semibold" >Description</p>
            <p className="border-b mb-4" ></p>
            <p className="text-sm mb-4 md:tracking-wider " >{Description}</p>
            <div className="flex">

            {Array.isArray(productImages) && productImages.map((item)=>{
            return(

       <div className="image-section flex  justify-center items-center"  key={item} >
                <img src={item} alt="" className="w-[90%]"  />
           </div>
)

            })}
            </div>

         
        </div>
        :""
        }
     
        </>
    )








}

export default Description;