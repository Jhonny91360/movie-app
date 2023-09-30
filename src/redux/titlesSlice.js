import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL='https://moviesdatabase.p.rapidapi.com/titles'
const X_RapidAPI_Key="ee04c582bemsh180cfafc6fca54ap1e1571jsnb62a626db06e"
const X_RapidAPI_Host="moviesdatabase.p.rapidapi.com"
const HEADERS={
    'X-RapidAPI-Key': X_RapidAPI_Key,
    'X-RapidAPI-Host': X_RapidAPI_Host
}

const initialState={
    loading:false,
    titles:[],
    titleTypes:[],
    keyWord:"",
    page:1,
    changePage:"",    //Tomara dos valores: "next" o "back" para que Filters.jsx modifique page y haga consulta a la api
    error:null,

    apiNextPage:null,
    apiPage:null,

}


const options = {
    method: 'GET',
    url:BASE_URL,
    params:{},
    headers:HEADERS
  };

// Se obtienen peliculas populares del año 2022 para mostrar inicialmente
export const getInitialTitles=createAsyncThunk('titles/getInitialTitles',async(params)=>{
    try {
        options.url=`${BASE_URL}`
        options.params=params
        const response= await axios.request(options)
        return response.data
    } catch (error) {
        console.log("Error API: "+error.message)
        throw error
    }
})

// Para obtener resultados de la api, segun los filtros acumulados en Filters.jsx
// el objeto params contiene la informacion para la busqueda
/* ejemplo para traer peliculas del año 2015 al 2020 en orden ascendente:
    params: {
        titleType: 'movies',
        startYear: 2010,
        endYear: 2020,
        sort:"year.incr"
  },
*/
export const getFilterTitles=createAsyncThunk('titles/getFilterTitles',async(params)=>{
    try {

        if(params.keyWord) {    //Si hay busqueda activa en la SearchBar
            const {keyWord,...newParams} = params; //Tomo key word y genero un objeto sin keyword para la consulta
            options.url=`${BASE_URL}/search/title/${keyWord}` //Ruta para busqueda de titulo 
            newParams.exact=false           //Para que la busqueda no sea estricta, sino que encuentre coincidencias
            options.params=newParams        //Agrego el params modificado para la consulta
        }
        else{               //Si no hay busqueda activa
            options.url=`${BASE_URL}`  //URL normal para busqueda con filtros
            options.params=params      //cargo params que contiene los filtros de Filters.jsx
        }

        options.params.limit=48;        //50 resultados es el maximo de la api, uso 48 por pagina muestro 12 = 4 pag
        
        const response= await axios.request(options)

        return response.data
    } catch (error) {
        console.log("Error API en titulos filtrados: "+error.message)
        throw error
    }
})


//  Se obtiene los tipos de titulos de la API (movies,series, etc) para mostrarlos en el filtro tipo
export const getTitleTypes=createAsyncThunk('titles/getTitleTypes',async()=>{
    try {
        options.url=`${BASE_URL}/utils/titleTypes`
        options.params={}
        const response= await axios.request(options)
        
        return response.data.results
    } catch (error) {
        console.log("Error API: "+error.message)
        throw error
    }
})

export const titlesSlice=createSlice({
    name:'titlesState',
    initialState,   
    reducers:{                       //Reduce para la search Bar    
        addKeyWord:(state,action)=>{
            state.keyWord=action.payload
        },                          //Reduce para la pagina de nuestra aplicacion
        refreshPage:(state,action)=>{
           
            state.page=action.payload
        },                          //Reduce para cambiar la pagina de la API
        changePaginated:(state,action)=>{
            
            state.changePage=action.payload
        },
        setApiPage:(state,action)=>{
            
            state.apiPage=action.payload
        },
    },

    extraReducers:(builder)=>{


        //initial titles
        builder.addCase(getInitialTitles.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getInitialTitles.fulfilled,(state,action)=>{
            state.loading=false
            state.titles=action.payload.results
            state.apiPage=action.payload.page
            state.apiNextPage=action.payload.next
            state.error=null
            state.changePage=""
        });
        builder.addCase(getInitialTitles.rejected,(state,action)=>{
            state.loading=false
            state.titles=[]
            state.error = action.error.message
            state.changePage=""
        });

        //filter titles
        builder.addCase(getFilterTitles.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getFilterTitles.fulfilled,(state,action)=>{
            state.loading=false
            state.titles=action.payload.results
            state.apiPage=action.payload.page
            state.apiNextPage=action.payload.next
            state.error=null
            state.changePage=""
        });
        builder.addCase(getFilterTitles.rejected,(state,action)=>{
            state.loading=false
            state.titles=[]
            state.error = action.error.message
            state.changePage=""
        });


        //title types
        builder.addCase(getTitleTypes.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getTitleTypes.fulfilled,(state,action)=>{
            state.loading=false
            state.titleTypes=action.payload
        });
        builder.addCase(getTitleTypes.rejected,(state,action)=>{
            state.loading=false
            state.titleTypes=[]
            state.error = action.error.message
        });

    }
})


export const{addKeyWord,refreshPage,changePaginated,setApiPage}=titlesSlice.actions;
export default titlesSlice.reducer;