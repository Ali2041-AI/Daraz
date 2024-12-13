function Services() {
  return (
    <>
      <p className="border  border-opacity-85 "></p>
      <div className="flex gap-9 py-4 bg-white" >
        <p className="self-start  opacity-65 tracking-wide ml-2 text-[15px]">Service</p>
        <div>
          <div>
            <div className="flex items-center gap-1" > 
                <p className="bg-black h-1 w-1 opacity-85 self-center mb-1 " ></p>
                <p className="text-[13px]" >14 days easy return</p>
            </div>
            <p className="text-[9.5px] opacity-70 mb-1 " >Change of mind is not applicable.</p>
          </div>
          <div className="flex items-center gap-1" >
            <p className="bg-black h-1 w-1 opacity-85 self-center mb-1 mr-[0.5px] " ></p>
            <p className="text-[13px]" >Warranty not available</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
