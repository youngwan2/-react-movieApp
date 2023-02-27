import React from "react";
import styles from "./Home.module.css";
import { useEffect, CSSProperties, useState } from "react";
import { getMovieData } from "../slice/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/home/Banner";
import MovieSlide from "../components/home/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";

export const API_KEY = process.env.REACT_APP_API_KEY;

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Home = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);


  const { popularMovie, topRateMovie, isComingMovie } = useSelector(
    (state: any) => {
      return state.movies.data;
    }
  );

  useEffect(() => {
    // 영화 데이터를 요청한다.
    dispatch(getMovieData());
    setLoading(false);
  }, [dispatch]);


  return (
    <div className={styles.home}>
      {loading === true ? (
        <ClipLoader
          className="spinner"
          id={styles.spinner}
          color={"purple"}
          loading={loading}
          cssOverride={override}
          size={150}
        />
      ) : (
        <div className={styles.main_container}>
          <Banner />
          <h1 className={styles.slide_title}>Popular</h1>
          <MovieSlide movies={popularMovie} />
          <h1 className={styles.slide_title}>High rating</h1>
          <MovieSlide movies={topRateMovie} />
          <h1 className={styles.slide_title}>Latest</h1>
          <MovieSlide movies={isComingMovie} />
        </div>
      )}
    </div>
  );
};

export default Home;
