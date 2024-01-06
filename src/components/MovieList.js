import MovieCard from "./MovieCard";

const MovieList = ({ title, movie }) => {
  if (!movie) return;

  return (
    <div className="p-4 md:py-4 lg:pt-10 lg:pl-16">
        <h1 className="text-xl font-bold py-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movie.map((movie) => (
            <MovieCard key={movie.id} posterpath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
