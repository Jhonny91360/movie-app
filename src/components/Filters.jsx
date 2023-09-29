import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { getFilterTitles,getInitialTitles,addKeyWord,refreshPage,setApiPage } from "../redux/titlesSlice";
import {BsChevronDown} from 'react-icons/bs'
import {PiArrowsDownUpLight} from 'react-icons/pi'
import {HiOutlineFilter} from 'react-icons/hi'



const Filters=()=>{

    let titleTypes=useSelector(state=>state.titlesState.titleTypes)//Leer tipo de titulos de la api (movies,tvseries, etc)
    titleTypes=titleTypes.slice(1); //Elimino el primer dato que es null
    
    const dispatch=useDispatch();
    const[params,setParams]=useState({});  //Params es un objeto que acumula caracteristicas de la busqueda
    
    //Estados para setear los valores que vemos en los filtros
    const[valueOrder,setValueOrder]=useState("Ordenar");
    const[valueYear,setValueYear]=useState("Año");
    const[valueType,setValueType]=useState("Tipo");

    const keyWord=useSelector(state=>state.titlesState.keyWord)  //Leer si se ha ingresado alguna busqueda en la SearchBar
    const changePage=useSelector(state=>state.titlesState.changePage) //Leer si el paginado llego al tope y esta pidiendo mas datos 
    let   apiPage=useSelector(state=>state.titlesState.apiPage)  //Leo la pagina actual de los resultados de la API

    useEffect(() => {

        if(changePage==="next"){  //EL boton ">" de paginado, pidio cambiar a la siguiente pagina de la API
            apiPage++;
        }else if(changePage==="back"&&apiPage>1){  //EL boton "<" de paginado, pidio regresar la pagina de la API
            apiPage--;
        }

        if(keyWord){  //Si hay una busqueda activa, agrego el texto a params para detectarlo en el reducer
            dispatch(getFilterTitles({ ...params,keyWord:keyWord,page:apiPage }));
        }else{
            const keys = Object.keys(params);
            //Revisar si el objeto esta vacio para pedir los titles iniciales
            if(!keys.length){
                dispatch(getInitialTitles({list: 'most_pop_movies',limit:48,year:2022,page:apiPage}));
            }
            //Si no esta vacio , entonces envio params para busqueda con los filtros activos
            else{
                dispatch(getFilterTitles({ ...params,page:apiPage }));
            }
        } 
       
      }, [params, dispatch,keyWord,changePage]);
   
    //Segun el valor del filtro, cambiamos starYear y endYear para la consulta a la api
    const handlerFiltersYear=(event)=>{
        dispatch(setApiPage(1)); //Hubo un cambio en filtros, vuelvo a pedir la pagina 1 de la api
        dispatch(refreshPage(1)); //Como hubo cambio en filtros o busqueda, reseteo la pagina para el paginado
        const valor=event.target.value;
        setValueYear(valor)
        const {startYear,endYear,...nuevoEstado} = params; // Crear un nuevo objeto sin startYear y endYear
        switch (valor) {
            case "2020 - 2023":
                setParams({...params,startYear:2020,endYear:2023})
                break;
            case "2010 - 2019":
                setParams({...params,startYear:2010,endYear:2019})
                break;
            case "2000 - 2009":
                setParams({...params,startYear:2000,endYear:2009})
                break;                   
            case "1990 - 1999":
                setParams({...params,startYear:1990,endYear:1999})
                break;                   
            case "1980 - 1989":
                setParams({...params,startYear:1980,endYear:1989})
                break;   
            case "1970 - 1979":
                setParams({...params,startYear:1970,endYear:1979})
                break;    
            case "1960 - 1969":
                setParams({...params,startYear:1960,endYear:1969})
                break;  
            case "1950 - 1959":
                setParams({...params,startYear:1950,endYear:1959})
                break;                                                                         
            default:
                //setParams({...params,startYear:"",endYear:""})
                setParams(nuevoEstado); // Establecer el nuevo estado sin startYear ni endYear
                break;
        }
        
        
    }

    //Segun el valor del filtro, modificamos sort para la consulta a la api
    const handlerFiltersOrder=(event)=>{
        dispatch(setApiPage(1)); //Hubo un cambio en filtros, vuelvo a pedir la pagina 1 de la api
        dispatch(refreshPage(1)); //Como hubo cambio en filtros o busqueda, reseteo la pagina para el paginado
        const valor=event.target.value
        setValueOrder(valor)
        const {sort,...nuevoEstado} = params; // Crear un nuevo objeto sin sort
        if(valor==='ASC'){

            setParams({...params,sort:"year.incr"})

        }else if(valor==='DESC'){

            setParams({...params,sort:"year.decr"})

        }else setParams(nuevoEstado); // Establecer el nuevo estado sin sort

        console.log("params ",params);
    }

    //Segun el valor del fitro, modificamos titleType para la consulta a la api
    const handlerFiltersType=(event)=>{
        dispatch(setApiPage(1)); //Hubo un cambio en filtros, vuelvo a pedir la pagina 1 de la api
        dispatch(refreshPage(1)); //Como hubo cambio en filtros o busqueda, reseteo la pagina para el paginado
        const valor= event.target.value
        const {titleType,...nuevoEstado} = params; // Crear un nuevo objeto sin titleType
        setValueType(valor)
        console.log(valor);
        if(valor!="TIPO") setParams({...params,titleType:valor})
        else setParams(nuevoEstado); // Establecer el nuevo estado sin titleType
    }
    //Resetear valores de filtros
    const cleanFilters=()=>{
        setValueOrder("Ordernar");
        setValueType("Tipo");
        setValueYear("Año")
        setParams({})
        dispatch(setApiPage(1)); //Hubo un cambio en filtros, vuelvo a pedir la pagina 1 de la api
        dispatch(refreshPage(1)); //Como hubo cambio en filtros o busqueda, reseteo la pagina para el paginado
        dispatch(addKeyWord(""));
    }
    return(  
        <div className="w-1/3 mx-auto flex flex-col items-center  md:flex-row md:justify-center md:space-x-4 p-4">
            <div  className="m-2 relative">
            <select value={valueYear} 
                    onChange={handlerFiltersYear} 
                    className=" p-2 pr-8 font-bold bg-white border border-black rounded appearance-none">
                    <option name="" id="">AÑO</option>
                    <option name="" id="">2020 - 2023</option>
                    <option name="" id="">2010 - 2019</option>
                    <option name="" id="">2000 - 2009</option>
                    <option name="" id="">1990 - 1999</option>
                    <option name="" id="">1980 - 1989</option>
                    <option name="" id="">1970 - 1979</option>
                    <option name="" id="">1960 - 1969</option>
                    <option name="" id="">1950 - 1959</option>
            </select>      
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronDown className="text-black"/>
            </div>
            </div>

            <div  className="m-2 relative">
            <select 
                value={valueOrder} 
                onChange={handlerFiltersOrder}
                className="p-2 pr-8 font-bold bg-white border border-black rounded appearance-none">
                <option name="" id="">ORDENAR</option>
                <option name="" id="">ASC </option>
                <option name="" id="">DESC</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <PiArrowsDownUpLight className="text-black"/>
            </div>
            </div>

            <div  className="m-2 relative">
            <select value={valueType} 
                    onChange={handlerFiltersType}
                    className=" p-2 pr-8 font-bold bg-white border border-black rounded appearance-none">
                <option name="" id="">TIPO</option>
                {
                    titleTypes?.map(type=>{
                        return(
                            <option key={type} value={type}> {type} </option>
                        )
                    })
                }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiOutlineFilter className="text-black"/>
            </div>
            </div>        



            <button onClick={()=>cleanFilters()}
            className="transition duration-100 transform hover:scale-105 bg-rose-700 text-md font-semibold px-4 text-white p-2 rounded"
            >LIMPIAR
            </button>
        </div>
    )
}

export default Filters