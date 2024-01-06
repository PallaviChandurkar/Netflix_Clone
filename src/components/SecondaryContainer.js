import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movie = useSelector((store)=>store.movies);

    return (
    <div className="bg-black lg:bg-none">
        <div className="mt-0 md:-mt-40 relative z-20">
        <MovieList title={"Now Playing"} movie={movie.nowPlayingMovies} />
        <MovieList title={"Popular"} movie={movie.popularMovies} />
        <MovieList title={"Top Rated"} movie={movie.topRatedMovies} />
        <MovieList title={"Upcoming"} movie={movie.upcomingMovies} />
        </div>
    </div>
    );
}

export default SecondaryContainer;