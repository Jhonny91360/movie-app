import { useDispatch } from "react-redux";
import { refreshPage } from "../redux/titlesSlice";

const Paginated = ({page, setPage, max}) => {

    const pages = Array.from({length: max}, (_, i) => i + 1);
    const dispatch=useDispatch();

    //actualizo la pagina en el componente Titles.jsx y en el estado global
    const pageHandler=(num)=>{
        dispatch(refreshPage(num))
        setPage(num)
    }

    const createButton = (paginas)=>{  //Funcion crea botones, el boton sera mas grande si es el numero de la pagina actual
      if(paginas===page) return (
                                
                                  <button key={paginas}  
                                          className="bg-red-700 p-2 rounded-lg w-12 mx-2 text-white text-[20px] font-bold"
                                          onClick={() =>{ pageHandler(paginas) }}> {paginas}
                                  </button>
                                 
                                  )
      else return (
                    <button key={paginas} 
                            className=" mx-4 text-gray-500 text-[20px] font-bold"
                            onClick={() => {pageHandler(paginas)}}  >{paginas}
                    </button>)
    } 
  
    

  return (
    <div  className="mt-10 flex flex-row justify-center">
    
    <button  disabled={page === 1} className=" mx-4 text-gray-500 text-[20px] font-bold" onClick={() =>{if(page>1){pageHandler(page-1)}}}>{"<"}</button>
    {/* Mostrar botones para cada página */}
    {pages.map((paginas) => (
      createButton(paginas) //LLamo a la funcion para crear botones
    ))}
    <button  disabled={page === max? true:false}  className=" mx-4 text-gray-500 text-[20px] font-bold" onClick={() => {pageHandler(page+1)}}>{">"}</button>
  </div>
  )
}
export default Paginated