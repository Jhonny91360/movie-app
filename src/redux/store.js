
import { configureStore } from "@reduxjs/toolkit";
import titlesReducer from "./titlesSlice"

export const store= configureStore({
    reducer:{
        titlesState:titlesReducer,
    }
})