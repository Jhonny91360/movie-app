import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//const {X_RapidAPI_Key,X_RapidAPI_Host} = import.meta.env.VITE
const X_RapidAPI_Key="ee04c582bemsh180cfafc6fca54ap1e1571jsnb62a626db06e"
const X_RapidAPI_Host="moviesdatabase.p.rapidapi.com"


const initialState={
    loading:false,
    titles:[]
}


const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    params: {
      list: 'most_pop_movies'
    },
    headers: {
      'X-RapidAPI-Key': X_RapidAPI_Key,
      'X-RapidAPI-Host': X_RapidAPI_Host
    }
  };

export const getInitialTitles=createAsyncThunk('titles/getInitialTitles',async()=>{
    try {
        const response= await axios.request(options)
        console.log("Respuesta API: ",response.data.results)
        return response.data.results
    } catch (error) {
        console.log("Error API: "+error.message)
        return error.message
    }
})


export const titlesSlice=createSlice({
    name:'titlesState',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        //initial titles
        builder.addCase(getInitialTitles.pending,(state)=>{
            state.loading=true
        });
        builder.addCase(getInitialTitles.fulfilled,(state,action)=>{
            state.loading=false,
            state.titles=action.payload
        });
        builder.addCase(getInitialTitles.rejected,(state)=>{
            state.loading=false,
            state.titles="pailas"
        });
    }
})



export default titlesSlice.reducer;