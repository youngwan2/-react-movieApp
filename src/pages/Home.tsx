import React from "react";
import { useEffect, CSSProperties, useState } from "react";
import { getMovieData } from "../slice/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

const Home = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const { popularMovie, topRateMovie, isComingMovie } = useSelector(
    (state: any) => {
      return state.movies.data;
    }
  );

  useEffect(() => {
    dispatch(getMovieData());
    setLoading(false);
  }, [dispatch]);

  return (
    <div className="home">
      {loading === true ? (
        <ClipLoader
          className="spinner"
          color={"purple"}
          loading={loading}
          cssOverride={override}
          size={150}
        />
      ) : (
        <div className="main_container">
          <Banner />
          <h1 className="slide_title">인기영화</h1>
          <MovieSlide movies={popularMovie} />
          <h1 className="slide_title">평점높은 영화</h1>
          <MovieSlide movies={topRateMovie} />
          <h1 className="slide_title">최신 영화</h1>
          <MovieSlide movies={isComingMovie} />
        </div>
      )}
    </div>
  );
}

export default Home;
