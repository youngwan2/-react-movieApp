import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MoviesCard.module.css";
import { SearchDateType, SearchDateTypeMapFunc } from "../../type/MoviesCard";
import MoviesCardContent from "./MoviesCardContent";

//컴포넌트
const MoviesCard = () => {
  const navigate = useNavigate();
  const searchDate = useSelector((state: SearchDateType) => {
    return state.sortBySearch.data.results;
  });

  return (
    <div className={styles.movies_card}>
      {searchDate
        ? searchDate.map((data: SearchDateTypeMapFunc, i: number) => {
            return (
              <div
                key={Math.random() * 10000 * (i+1)}
                className={styles.movies_card_img}
                style={{
                  //이미지 빈 배경일 시 대체 이미지 처리해야 함.
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.poster_path})`,
                }}
                onClick={() => {
                  navigate(`/detail/${data.id}`);
                }}
              >
                <MoviesCardContent data={data} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MoviesCard;
