import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieList = () => {
  const searchmovie = useSelector((store) => store.movies.searchMovieList);
  if (!searchmovie) return;

  return (
    <div className="m-4 p-4 bg-black opacity-90">
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {searchmovie.map((movie) => (
            <MovieCard key={movie.id} posterpath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieList;
