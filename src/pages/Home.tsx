import React from "react";
import styles from "./Home.module.css";
import type {RootState} from '../store';
import { useEffect, useState } from "react";
import { getMovieData } from "../slice/MovieSlice";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/home/Banner";
import MovieSlide from "../components/home/MovieSlide";
import Spinner from "../components/spinner/Spinner";

export const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);

  const { popularMovie, topRateMovie, isComingMovie } = useSelector(
    (state: any) => {
      return state.movies.data;
    }
  );

  console.log(popularMovie)

  useEffect(() => {
    // 영화 데이터를 요청한다.
    dispatch(getMovieData());
    setLoading(false);
  }, [dispatch]);

  return (
    <div className={styles.home}>
      {loading === true ? (
        <Spinner />
      ) : (
        <article className={styles.main_container}>
          <Banner />
          <h1 className={styles.slide_title}>Popular</h1>
          <MovieSlide movies={popularMovie} />
          <h1 className={styles.slide_title}>High rating</h1>
          <MovieSlide movies={topRateMovie} />
          <h1 className={styles.slide_title}>Latest</h1>
          <MovieSlide movies={isComingMovie} />
        </article>
      )}
    </div>
  );
};

export default Home;
