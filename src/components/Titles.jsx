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

    const apiPage=useSelector(state=>state.titlesState.apiPage) //Leer API page actual para hacer logica de paginado

                                                                //apiPage=1 => paginado[1-4] , Apipage=2=> paginado[5-8]...etc
    //Logica para paginado
    

    const [page, setPage] = useState(globalPage);  //Estado para la pagina actual, inicia en 1
    const [perPage] = useState(12);       //Estado para la cantidad de elementos por pagina

    let startIndex=0;
    let endIndex=0;

    if(apiPage>1){  //Si estamos avanzados en el paginado pagina 5 en adelnta equiva a apiPage>2
        startIndex = (page-( (apiPage-1)*4 ) - 1) * perPage;  //para hallar el indice inicial del slice
        endIndex = startIndex + perPage;    //para hallar el indice final del slice    
    }
    else{           //Si estamos en la pagina 1 apiPage 1
        startIndex = (page - 1) * perPage;  //para hallar el indice inicial del slice
        endIndex = startIndex + perPage;    //para hallar el indice final del slice
    }


    let cantPages = Math.ceil((titles?.length / perPage));  // para hallar la cantidad de paginas necesarias segun la cantidad de titles

    let min=(4*apiPage)-3 // calculo de min = si apiPage =1   ... paginado = [min=1 -- min+cantPages]
                        //                    si apiPage=2    ... paginado = [min=5 -- min+cantPages]

    let max= (min+cantPages)-1


    const titlesPaginated= titles?.slice(startIndex, endIndex);



    useEffect(()=>{
        
        setPage(globalPage)
    },[globalPage])

    return (
        <div className="max-w-[1600px] h-full mx-auto p-4 ">
        <div className="justify-center items-center flex flex-row flex-wrap  ">
           
              
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
        <Paginated page={page} setPage={setPage} max={max} min={min}/>
        </div>
        
    )
}

export default Titles