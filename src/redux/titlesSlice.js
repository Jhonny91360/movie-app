import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//const {X_RapidAPI_Key,X_RapidAPI_Host} = import.meta.env.VITE
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
    nextPage:null
}


const options = {
    method: 'GET',
    url:BASE_URL,
    params:{},
    headers:HEADERS
  };

// Se obtienen peliculas populares del año 2022 para mostrar inicialmente
export const getInitialTitles=createAsyncThunk('titles/getInitialTitles',async()=>{
    try {
        options.url=`${BASE_URL}`
        options.params={list: 'most_pop_movies',limit:50,year:2022}
        const response= await axios.request(options)
        //console.log("Respuesta API: ",response.data.results)
        console.log("lo que entrega la API: ",response.data);
        return response.data
    } catch (error) {
        console.log("Error API: "+error.message)
        return error.message
    }
})

//  Se obtiene los tipos de titulos de la API (movies,series, etc) para mostrarlos en el filtro tipo
export const getTitleTypes=createAsyncThunk('titles/getTitleTypes',async()=>{
    try {
        options.url=`${BASE_URL}/utils/titleTypes`
        options.params={}
        const response= await axios.request(options)
        //console.log("Respuesta tipos: ",response.data.results)
        return response.data.results
    } catch (error) {
        console.log("Error API: "+error.message)
        return error.message
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

        options.params.limit=50;        //50 resultados es el maximo de la api
        
        const response= await axios.request(options)
        console.log("URL: "+options.url);
        console.log("Params: ",options.params);
        //console.log("Respuesta titulos filtrados: ",response.data.results)
        return response.data
    } catch (error) {
        console.log("Error API en titulos filtrados: "+error.message)
        return error.message
    }
})


export const titlesSlice=createSlice({
    name:'titlesState',
    initialState,   
    reducers:{            //Reduces para la search Bar    
        addKeyWord:(state,action)=>{
            state.keyWord=action.payload
        },
        refreshPage:(state,action)=>{
            console.log("refrescando pagina: "+action.payload)
            state.page=action.payload
        }
    },

    extraReducers:(builder)=>{
        //initial titles
        builder.addCase(getInitialTitles.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getInitialTitles.fulfilled,(state,action)=>{
            state.loading=false,
            state.titles=action.payload.results
            state.nextPage=action.payload.next
        });
        builder.addCase(getInitialTitles.rejected,(state)=>{
            state.loading=false,
            state.titles=[]
        });
        //title types
        builder.addCase(getTitleTypes.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getTitleTypes.fulfilled,(state,action)=>{
            state.loading=false,
            state.titleTypes=action.payload
        });
        builder.addCase(getTitleTypes.rejected,(state)=>{
            state.loading=false,
            state.titleTypes=[]
        });

        //filter titles
        builder.addCase(getFilterTitles.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getFilterTitles.fulfilled,(state,action)=>{
            state.loading=false,
            state.titles=action.payload.results
            state.nextPage=action.payload.nextPage
        });
        builder.addCase(getFilterTitles.rejected,(state)=>{
            state.loading=false,
            state.titleTypes=[]
        });
    }
})


export const{addKeyWord,refreshPage}=titlesSlice.actions;
export default titlesSlice.reducer;