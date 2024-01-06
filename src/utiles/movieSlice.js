import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        videoTrailer: null,
        searchMovieList: null
    },
    reducers: {
        addNowPlayingMovies: (state,action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state,action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state,action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state,action) => {
            state.upcomingMovies = action.payload;
        },
        addVideoTrailer: (state,action) => {
            state.videoTrailer = action.payload;
        },
        addSearchMovieList: (state,action) => {
            state.searchMovieList = action.payload;
        }
    }
})

export const { addNowPlayingMovies, addVideoTrailer, addSearchMovieList, addPopularMovies, addTopRatedMovies, addUpcomingMovies } = movieSlice.actions; 
export default movieSlice.reducer;