import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyWord ,setApiPage,refreshPage} from "../redux/titlesSlice";
import { BsSearch } from 'react-icons/bs'; // Importa el ícono de búsqueda

const SearchBar = () => {

  const [keyword, setKeyword] = useState(""); //Estado para la busqueda ingresada en el input
  const dispatch = useDispatch();

  const wordValue = useSelector((state) => state.titlesState.keyWord); //Para leer el valor global
                                                                       //y resetar segun el boton "limpiar"
                                                                       // de Filter.jsx

  useEffect(() => {             //tomo el valor global para actualizar estado local
    setKeyword(wordValue);
  }, [wordValue]);

  const searchByKeyWord = (text) => {  
    
    dispatch(refreshPage(1)) //Al ejecutar una busqueda, vuelvo a la pagina 1

    dispatch(setApiPage(1)); //Hubo un cambio en filtros, vuelvo a pedir la pagina 1 de la api
                                        //Cuando se pulsa search, enviamos el texto al slicer
    dispatch(addKeyWord(text));         //luego este texto lo toma Filter.jsx y lo combina 
  };                                    //segun los filtros actuales para generar la busqueda


  const handleChangeText = (event) => { //Actualizo estado local a medida que se ingresa texto
    setKeyword(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchByKeyWord(keyword);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 text-center">
    <div className="relative">
      <input
        value={keyword}
        className="w-1/3 bg-white border border-black rounded-md p-2 pr-10 shadow"
        type="search"
        name=""
        id=""
        placeholder="What do you want to watch?"
        onChange={handleChangeText}
        onKeyPress={handleEnterKeyPress}
      />
      <button
        onClick={() => searchByKeyWord(keyword)}
        className="absolute right-1/3 top-1 text-white px-4 py-2 rounded-md"
      >
        <BsSearch className=" text-black"/>
      </button>
    </div>
  </div>
);
};
export default SearchBar;