const defaultImage="image-not-found.jpg"
const CardTitle=({image,titleText,titleType,year})=>{
   
    return (
        <div className="transition duration-100 transform hover:scale-105 w-[250px] h-[450px] mx-11 flex flex-col  relative ">
            <img className='w-full h-5/6 rounded-3xl' src={image?image:defaultImage} alt=""
                 onError={ (e)=>{e.target.src=defaultImage} }
            />
            <h6 className="text-gray-400 font-semibold">USA,{year} </h6>
            <label className=" text-[20px] text-left font-bold">{titleText}</label> 
            <div className="z-10 absolute top-7 left-5  bg-gray-100 w-24 opacity-70 ty-1 rounded-full flex flex-col items-center ">
                <label className="text-center font-bold">{titleType.toUpperCase()}</label>
            </div>
        </div>
    )
}

export default CardTitle