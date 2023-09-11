import styles from "./Movies.module.css";
import MoviesSide from "../components/movies/MovieSide";
import MoviesCard from "../components/movies/moviesCard/MoviesCard";
import TopShift from "../components/movies/TopShift";
import { useEffect, useState } from "react";

const Movies = () => {
  const [display, setDisplay] = useState(true);
  const [scrollY, setScrollY] = useState(0); //스크롤 Y 값 저장

  // 6초 뒤에 안내 메시지창 사라지게 함.
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 6000);
  }, []);

  const onScrollFunc = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    scrollY > 50
      ? window.removeEventListener("scroll", onScrollFunc)
      : window.addEventListener("scroll", onScrollFunc);
  }, [scrollY]);

  return (
    <section className={styles.movies}>
      {display === true ? (
        <article className={styles.movies_disappear_box}>
          <div className={styles.box_content}>
            {" "}
            방문 해주셔서 감사합니다! 좌측 상단의{" "}
            <mark
              style={{
                borderRadius: "20px",
                padding: "0px 8px 0px 10px",
                textAlign: "center",
              }}
            >
              ▶
            </mark>{" "}
            을 클릭하면 카테고리 메뉴를 보실 수 있습니다. 그럼 좋은 하루
            되세요!.
          </div>
        </article>
      ) : null}

      <div className={styles.movies_container}>
        <MoviesSide />
        <MoviesCard />
        {scrollY > 50 ? <TopShift /> : null}
      </div>
    </section>
  );
};

export default Movies;
