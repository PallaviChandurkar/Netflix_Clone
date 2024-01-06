import { useSelector } from "react-redux";
import useMovieTrailer from "../hook/useMovieTrailer";

const VideoBackground = ({movieId}) => {
    
    const trailerId = useSelector((store) => store.movies?.videoTrailer);
    useMovieTrailer(movieId);

  return (
    <div className="bg-black pt-[40%] md:pt-0">
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerId?.key+"?si=lD1R1O6PGImP0o5-"+"?&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
