import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {

    const movie = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movie) return;

    const mainmovie = movie[0];

    const { original_title, overview, id } = mainmovie;

    return (
    <div>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} />
    </div>
    );
}

export default MainContainer;