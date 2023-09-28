import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { getFilterTitles,getInitialTitles,addKeyWord } from "../redux/titlesSlice";



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

    useEffect(() => {
        
        if(keyWord){  //Si hay una busqueda activa, agrego el texto a params para detectarlo en el reducer
            dispatch(getFilterTitles({ ...params,keyWord:keyWord }));
        }else{
            const keys = Object.keys(params);
            //Revisar si el objeto esta vacio para pedir los titles iniciales
            if(!keys.length){
                dispatch(getInitialTitles());
            }
            //Si no esta vacio , entonces envio params para busqueda con los filtros activos
            else{
                dispatch(getFilterTitles({ ...params }));
            }
        }
      }, [params, dispatch,keyWord]);
   
    //Segun el valor del filtro, cambiamos starYear y endYear para la consulta a la api
    const handlerFiltersYear=(event)=>{
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
        const valor=event.target.value
        setValueOrder(valor)
        const {sort,...nuevoEstado} = params; // Crear un nuevo objeto sin sort
        if(valor==='Asc'){

            setParams({...params,sort:"year.incr"})

        }else if(valor==='Desc'){

            setParams({...params,sort:"year.decr"})

        }else setParams(nuevoEstado); // Establecer el nuevo estado sin sort

        console.log("params ",params);
    }

    //Segun el valor del fitro, modificamos titleType para la consulta a la api
    const handlerFiltersType=(event)=>{
        const valor= event.target.value
        const {titleType,...nuevoEstado} = params; // Crear un nuevo objeto sin titleType
        setValueType(valor)
        console.log(valor);
        if(valor!="Tipo") setParams({...params,titleType:valor})
        else setParams(nuevoEstado); // Establecer el nuevo estado sin titleType
    }
    //Resetear valores de filtros
    const cleanFilters=()=>{
        setValueOrder("Ordernar");
        setValueType("Tipo");
        setValueYear("Año")
        setParams({})
        dispatch(addKeyWord(""));
    }
    return(
        <div className="flex justify-center items-center p-4">
            <select value={valueYear} onChange={handlerFiltersYear}>
                <option name="" id="">Año</option>
                <option name="" id="">2020 - 2023</option>
                <option name="" id="">2010 - 2019</option>
                <option name="" id="">2000 - 2009</option>
                <option name="" id="">1990 - 1999</option>
                <option name="" id="">1980 - 1989</option>
                <option name="" id="">1970 - 1979</option>
                <option name="" id="">1960 - 1969</option>
                <option name="" id="">1950 - 1959</option>
            </select>

            <select 
                value={valueOrder} 
                onChange={handlerFiltersOrder}>
                <option name="" id="">Ordenar</option>
                <option name="" id="">Asc </option>
                <option name="" id="">Desc </option>
            </select>

            <select value={valueType}  onChange={handlerFiltersType}>
                <option name="" id="">Tipo</option>
                {
                    titleTypes?.map(type=>{
                        return(
                            <option key={type} value={type}> {type} </option>
                        )
                    })
                }
            </select>
            <button onClick={()=>cleanFilters()}>Limpiar</button>
        </div>
    )
}

export default Filters