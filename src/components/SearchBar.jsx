import { useState,useEffect  } from "react"
import { useDispatch,useSelector } from "react-redux"
import { addKeyWord } from "../redux/titlesSlice"


const SearchBar=()=>{

    const[keyword,setKeyword]=useState("");

    const dispatch=useDispatch();

    const wordValue=useSelector(state=>state.titlesState.keyWord) //Leer la keyword del estado global, para actualizar cuando se 
                                                               //limpian filtros
    useEffect(()=>{                 //Cuando se actualiza la keyWord del estado global, tomo ese valor para el value del input
        setKeyword(wordValue);
    },[wordValue])

    const searchByKeyWord=(text)=>{
        dispatch(addKeyWord(text))
    }

    const handleChangeText=(event)=>{
        setKeyword(event.target.value)
    }
    return(
        <div className="flex justify-center items-center p-4">
            <input 
            value={keyword}
            className="w-1/6 bg-gray-100"
            type="search" 
            name="" id="" 
            placeholder="What do you want to watch?"
            onChange={handleChangeText}
            />
            <button onClick={()=>{searchByKeyWord(keyword)}}>Search</button>
        </div>
    )
}

export default SearchBar