import { useDispatch, useSelector } from "react-redux";
import { API_options, BG_URL } from "../utiles/constants";
import lang from "../utiles/languageConstants";
import { useRef } from "react";
import { addSearchMovieList } from "../utiles/movieSlice";

const GptSearchbar = () => {

  const searchlang = useSelector((store)=>store.config.lang);
  const dispatch = useDispatch();

  const searchtext = useRef(null);

  const handleGptSearchClick = async() => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+searchtext.current.value+"&include_adult=false&language=en-US&page=1",API_options);
    const json = await data.json();
    console.log(json.results);
    dispatch(addSearchMovieList(json.results));
  }

  return (
    <div>
      <div className="absolute -z-10">
        <img className="h-screen object-cover  md:w-screen" src={BG_URL} alt="logo" />
      </div>
      <div className="pt-[50%] md:pt-[20%] lg:pt-[10%] flex justify-center">
      <form className="p-1 m-4 bg-black rounded-md" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={lang[searchlang].gptPlaceholderSearch}
          className="p-3 m-3 w-60 md:w-96 rounded-md" ref={searchtext}
        />
        <button className="py-3 px-8 m-3 bg-red-600 text-white rounded-md" onClick={handleGptSearchClick}>
          {lang[searchlang].search}
        </button>
      </form>
      </div>
    </div>
  );
};

export default GptSearchbar;
