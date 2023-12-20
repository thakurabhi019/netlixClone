import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoint, platformType, requests } from "../../utility/apirequests";
import axios from '../../utility/axios';

const initialState = {
    nowPlaying:{
        status:"idle",
        data:null,
        error:null

    }
}

 export const fetchNowPlayingMovies = createAsyncThunk(
    "movie/fetchNowPlayingMovies",
    async() => {
        const response = await axios.get(requests.getCollection(platformType.movie,endpoint.nowPlaying));
        return response.data;
    }
)

export const movieSlice = createSlice({
    initialState,
    name:"movie",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNowPlayingMovies.pending,(state,action) => {
            state.nowPlaying.status = "loading"
        })
        .addCase(fetchNowPlayingMovies.fulfilled,(state, action)=>{
            state.nowPlaying.status = "success";
            state.nowPlaying.data = action.payload;
        })
        .addCase(fetchNowPlayingMovies.rejected,(state, action)=>{
            state.nowPlaying.status = "failed";
            state.nowPlaying.error = action.error;
        })

    }
});

//selctor

export const selectNowPlayingMovies = (state) => state.movie.nowPlaying;

export default movieSlice.reducer;