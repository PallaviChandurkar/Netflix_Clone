import { IMG_CDN_URL } from "../utiles/constants";

const MovieCard = ({posterpath}) => {
    if (!posterpath) return;
    return (
        <div className="w-40 pr-2">
            <img src={IMG_CDN_URL + posterpath}  alt="poster image" />
        </div>
    )
}

export default MovieCard;