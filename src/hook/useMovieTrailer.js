import { useDispatch } from "react-redux";
import { API_options } from "../utiles/constants";
import { useEffect } from "react";
import { addVideoTrailer } from "../utiles/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getPlayingVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos?",
        API_options
      );
      const json = await data.json();
      const trailer = json.results.filter((video) => video.type === "Trailer");
      const finaltrailer = trailer.length ? trailer[0] : json.results[0];
      dispatch(addVideoTrailer(finaltrailer));
    };
  
    useEffect(() => {
      getPlayingVideos();
    }, []);
}

export default useMovieTrailer;