import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../utility/axios";
import { requests } from "../../utility/apirequests";

const initialState = {
    netflixOriginals: {
        status: 'idle',
        data: null,
        error: null
    }
}

 export const fetchNetflixOriginals = createAsyncThunk(
    "tv/fetchNetflixOriginals",
    async()=>{
        const response = await axios.get(requests.getNetflixOriginals);
        return response.data;
    }
);

 export const tvSlice = createSlice({
    initialState,
    name: "tv",
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchNetflixOriginals.pending, (state, action)=>{
            state.netflixOriginals.status = "loading";
        })
        .addCase(fetchNetflixOriginals.fulfilled, (state, action)=>{
            state.netflixOriginals.status = "success";
            state.netflixOriginals.data = action.payload;
        })
        .addCase(fetchNetflixOriginals.rejected, (state, action)=>{
            state.netflixOriginals.status = "failed";
            state.netflixOriginals.error = action.error;
        })
    }
})

//selector function
export const selectNetflixOriginals = (state) => state.tv.netflixOriginals;

export default tvSlice.reducer;