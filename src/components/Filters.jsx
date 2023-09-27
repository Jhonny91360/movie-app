import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { getFilterTitles } from "../redux/titlesSlice";



const Filters=()=>{

    let titleTypes=useSelector(state=>state.titlesState.titleTypes)
    titleTypes=titleTypes.slice(1); //Elimino el primer dato que es null
    //console.log("mis tipos de titulos para filtros: ",titleTypes);
    const dispatch=useDispatch();
    const[params,setParams]=useState({});  //Params es un objeto que acumula caracteristicas de la busqueda
    
    //Estados para setear los valores que vemos en los filtros
    const[valueOrder,setValueOrder]=useState("Ordenar");
    const[valueYear,setValueYear]=useState("Año");
    const[valueType,setValueType]=useState("Tipo");

    useEffect(() => {
        dispatch(getFilterTitles({ ...params }));
      }, [params, dispatch]);
   
    //Segun el valor del filtro, cambiamos starYear y endYear para la consulta a la api
    const handlerFiltersYear=(event)=>{
        const valor=event.target.value;
        setValueYear(valor)
        const {startYear,endYear,...nuevoEstado} = params; // Crear un nuevo objeto sin startYear y endYear
        switch (valor) {
            case "2020 - 2023":
                setParams({...params,startYear:2020,endYear:2023})
                break;
            case "2010 - 2020":
                setParams({...params,startYear:2010,endYear:2020})
                break;
            case "2000 - 2010":
                setParams({...params,startYear:2000,endYear:2010})
                break;                   
            case "1990 - 2000":
                setParams({...params,startYear:1990,endYear:2000})
                break;                   
            case "1980 - 1990":
                setParams({...params,startYear:1980,endYear:1990})
                break;   
            case "1970 - 1980":
                setParams({...params,startYear:1970,endYear:1980})
                break;    
            case "1960 - 1970":
                setParams({...params,startYear:1960,endYear:1970})
                break;  
            case "1950 - 1960":
                setParams({...params,startYear:1950,endYear:1960})
                break;                                                                         
            default:
                //setParams({...params,startYear:"",endYear:""})
                setParams(nuevoEstado); // Establecer el nuevo estado sin startYear ni endYear
                break;
        }
        
        console.log("rango de años:"+valueYear);
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
    return(
        <div className="flex justify-center items-center p-4">
            <select value={valueYear} onChange={handlerFiltersYear}>
                <option name="" id="">Año</option>
                <option name="" id="">2020 - 2023</option>
                <option name="" id="">2010 - 2020</option>
                <option name="" id="">2000 - 2010</option>
                <option name="" id="">1990 - 2000</option>
                <option name="" id="">1980 - 1990</option>
                <option name="" id="">1970 - 1980</option>
                <option name="" id="">1960 - 1970</option>
                <option name="" id="">1950 - 1960</option>
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
            <button>Limpiar</button>
        </div>
    )
}

export default Filters