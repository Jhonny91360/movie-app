import { useSelector } from "react-redux"
import { useState,useEffect } from "react"
import CardTitle from "./CardTitle"
import Paginated from './Paginated'


const Titles=()=>{
    const titles= useSelector(state=>state.titlesState.titles ) //Leer titulos del estado global
    const error=  useSelector(state=>state.titlesState.error )  //Leer si hubo un error en la peticion a la API
    const loading= useSelector(state=>state.titlesState.loading ) // Leer si se esta ejecutando una peticion a la API

    const globalPage=useSelector(state=>state.titlesState.page)//Para volver a la pagina 1 cuando se aplica un filtro
                                                               //o se hace una busqueda nueva, Filter.jsx actualiza state.page         

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
           
              
                {/* //Mostrar los titulos cargados en el estado global */}
                { 
                !error && !loading && titlesPaginated?.map( (title)=>(
                <div key={title?.id} className="p-1 mb-4">
                <CardTitle key={title?.id}
                   image={title.primaryImage?.url}
                   titleText={title.titleText?.text}
                   year={title.releaseYear?.year}
                   titleType={title.titleType?.text}         
                />
                </div>
               
                )) }
                
                {/* Mostrar que no hubo resultados */}

                {    
                !error && !loading && !titles.length?
                (<div className="flex justify-center items-center w-full h-40 bg-gray-200">
                <p className="mx-4 text-gray-500 text-[30px] font-bold">No hay titulos con ese nombre. </p>
                </div>):null
                }

                {/* Mostrar que hubo un problema con el servidor de la API */}

                {
                error && !loading ?
                (<div className="flex justify-center items-center w-full h-40 bg-gray-200">
                <p className="mx-4 text-gray-500 text-[30px] font-bold">El servidor no responde </p>
                </div>):null
                }

                {/* Mostrar que se esta cargando la info, osea mientras se espera respuesta da la API*/}
                {
                loading ?
                (<div className="flex justify-center items-center w-full h-40 bg-gray-200">
                <p className="mx-4 text-gray-500 text-[30px] font-bold">Cargando...</p>
                </div>):null
                }

        </div> 
        <Paginated page={page} setPage={setPage} max={max}/>
        </div>
        
    )
}

export default Titles