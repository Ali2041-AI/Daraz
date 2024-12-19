function Description({Description,productImages}){






    return(
        <>
        {Description
        ? <div className="bg-white mt-2 p-4" >
            <p className="self-start text-sm opacity-65 tracking-wide mb-6" >Description</p>
            <p className="border-b mb-4" ></p>
            <p className="text-sm mb-4 " >{Description}</p>
            {Array.isArray(productImages) && productImages.map((item)=>{
            return(

       <div className="image-section" key={item} >
                <img src={item} alt=""  />
           </div>
)

            })}
         
        </div>
        :""
        }
     
        </>
    )








}

export default Description;