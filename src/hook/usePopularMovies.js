import { useEffect } from "react";
import { API_options } from "../utiles/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utiles/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_options
      );
      const json = await data.json();
      // console.log(json);
      dispatch(addPopularMovies(json.results));
    };
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
