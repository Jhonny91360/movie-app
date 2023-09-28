import { useSelector } from "react-redux"
import CardTitle from "./CardTitle"

const Titles=()=>{
    const titles= useSelector(state=>state.titlesState.titles )
    //console.log("titulos en home: ",titles)

    return (
        <div className="w-1/2 mx-auto p-4 bg-red-400">
        <div className="flex flex-wrap -mx-4 bg-blue-200">
           
            {   titles?.map( (title)=>(
                <div key={title?.id} className="w-1/4 p-4 mb-4">
                <CardTitle key={title?.id}
                   image={title.primaryImage?.url}
                   titleText={title.titleText?.text}
                   year={title.releaseYear?.year}
                   titleType={title.titleType?.text}         
                />
                </div>
               
                ))   
            }
        </div> 
        </div>
    )
}

export default Titles