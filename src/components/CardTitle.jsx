const defaultImage="image-not-found.jpg"
const CardTitle=({image,titleText,titleType,year})=>{
   
    return (
        <div className="bg-lime-100 flex flex-col items-center ">
            <img className='w-40 h-52 rounded-xl' src={image?image:defaultImage} alt=""
                 onError={ (e)=>{e.target.src=defaultImage} }
            />
            <h6>Usa,{year} </h6>
            <label className="font-bold">{titleText}</label> 
            <div className="bg-gray-100 w-24 opacity-1 rounded-full flex flex-col items-center ">
                <label className="">{titleType.toUpperCase()}</label>
            </div>
        </div>
    )
}

export default CardTitle