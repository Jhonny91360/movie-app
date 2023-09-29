import { useDispatch,useSelector } from "react-redux";
import { refreshPage } from "../redux/titlesSlice";
import { changePaginated } from "../redux/titlesSlice";


const Paginated = ({page, setPage, max, min}) => {


    console.log("me llego page= "+page);
    //                                                                             apiPage=1    apiPage=2
    //Creo el array que representa los numeros de los botones del paginado ejemplo [1,2,3,4]    [5,6,7,8]
    const pages = Array.from({length:(max-min)+1}, (_, i) => i + min);
    console.log("resultado pages: ",pages);
    const dispatch=useDispatch();

    // Para saber si hay mas resultados por buscar en la API, la api responde siempre si hay una nextPage
    const apiNextPage= useSelector(state=>state.titlesState.apiNextPage )
    //                                                                                                  apiPage=2                                       
    //Para saber el valor actual de la pagina de la API, si es >1 quiere decir que podemos volver atras [5,6,7,8]
    const apiPage=useSelector(state=>state.titlesState.apiPage )



    //actualizo la pagina en el componente Titles.jsx y en el estado global
    const pageHandler=(num)=>{
        console.log("valor de page: "+page);
        console.log("valor apiPage: "+apiPage);
        if(num>max){    //Si llega 5 y la pagina max era 4 , se solicita siguiente paquete de datos a la api, apiNextPage=2
          dispatch(changePaginated("next"))
          dispatch(refreshPage(num))
        }else if(num<min){
          dispatch(changePaginated("back"))
          dispatch(refreshPage(num))
        }
        else{
        dispatch(refreshPage(num))
        setPage(num)
        }
    }

    const createButton = (paginas)=>{  //Funcion crea botones, el boton sera mas grande si es el numero de la pagina actual
      if(paginas===page) return (
                                
                                  <button key={paginas}  
                                          className="bg-rose-700 p-2 rounded-lg w-12 mx-2 text-white text-[20px] font-bold"
                                          onClick={() =>{ pageHandler(paginas) }}> {paginas}
                                  </button>
                                 
                                  )
      else return (
                    <button key={paginas} 
                            className=" p-2 rounded-lg w-12 mx-2 text-gray-600 text-[20px] font-bold"
                            onClick={() => {pageHandler(paginas)}}  >{paginas}
                    </button>)
    } 
  
    

  return (
    <div  className="mt-10 flex flex-row justify-center">
    
    <button  disabled={ (page === 1)&&(apiPage==1) } className=" mx-4 text-gray-500 text-[20px] font-bold" onClick={() =>{{pageHandler(page-1)}}}>{"<"}</button>
    {/* Mostrar botones para cada página */}
    {pages.map((paginas) => (
      createButton(paginas) //LLamo a la funcion para crear botones
    ))}
    <button  disabled={( (page === max)&&!apiNextPage)? true:false}  className=" mx-4 text-gray-500 text-[20px] font-bold" onClick={() => {pageHandler(page+1)}}>{">"}</button>
  </div>
  )
}
export default Paginated