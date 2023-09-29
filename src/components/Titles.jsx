import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
import CardTitle from "./CardTitle"
import Paginated from './Paginated'


const Titles=()=>{
    const titles= useSelector(state=>state.titlesState.titles )
    const globalPage=useSelector(state=>state.titlesState.page)
    //Logica para paginado
    const [page, setPage] = useState(globalPage);  //Estado para la pagina actual, inicia en 1
    const [perPage] = useState(12);       //Estado para la cantidad de elementos por pagina

    const startIndex = (page - 1) * perPage;  //para hallar el indice inicial del slice
    const endIndex = startIndex + perPage;    //para hallar el indice final del slice

    const max = Math.ceil(titles?.length / perPage);  // para hallar la cantidad de paginas necesarias segun la cantidad de recetas

    const titlesPaginated= titles?.slice(startIndex, endIndex);

    useEffect(()=>{
        console.log("renderizado por reseteo de pagina");
        setPage(globalPage)
    },[globalPage])

    return (
        <div className="max-w-[1600px] h-[1400px] mx-auto p-4 bg-red-400">
        <div className="flex flex-row flex-wrap -mx-4 bg-blue-200">
           
            {   titlesPaginated?.map( (title)=>(
                <div key={title?.id} className="p-1 mb-4">
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
        <Paginated page={page} setPage={setPage} max={max}/>
        </div>
        
    )
}

export default Titles