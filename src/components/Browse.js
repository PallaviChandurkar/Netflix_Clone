import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hook/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import usePopularMovies from "../hook/usePopularMovies";
import useTopRatedMovies from "../hook/useTopRatedMovies";
import useUpcomingMovies from "../hook/useUpcomingMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const showGptSearchbar = useSelector((store) => store.gpt.showGptSearchPage);

  return (
    <div>
      <Header />
      {showGptSearchbar ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
