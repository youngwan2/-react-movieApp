import React from "react";
import styles from "./MovieSlide.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SlideCard from "./SlideCard";

// 반응형 슬라이드 라이브러리 (옵션 설정 부분)
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
  },
};

interface MovieSlideType {
  movies: {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
  };
}
const MovieSlide: React.FC<MovieSlideType> = ({ movies }) => {
  return (
    <div className={styles.movieSlide}>
      <Carousel responsive={responsive} className={styles.carousel}>
        {movies && movies.results !== undefined ? (
          movies.results.map((movieEl, i: number) => {
            return (
              <SlideCard key={Math.random() * 10000 * i} movieList={movieEl} />
            );
          })
        ) : (
          <div />
        )}
      </Carousel>
    </div>
  );
};

export default MovieSlide;
