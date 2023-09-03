import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MoviesCard.module.css";
import { SearchDateType, SearchDateTypeMapFunc } from "../../type/MoviesCard";
import MoviesCardContent from "./MoviesCardContent";

//컴포넌트
const MoviesCard = () => {
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const searchDate = useSelector((state: SearchDateType) => {
    const results = state.sortBySearch.data.results;
    return results;
  });

  useEffect(() => {
    if (searchDate && searchDate.length < 1) {
      setAlert(
        "The information you are looking for does not exist. I'm sorry."
      );
    } else {
      setAlert("");
    }
  }, [searchDate]);

  return (
    <div className={styles.movies_card}>
      {searchDate && searchDate.length > 1 ? (
        searchDate.map((data: SearchDateTypeMapFunc, i: number) => {
          return (
            <div
              key={i}
              className={styles.movies_card_img}
              style={{
                //이미지 빈 배경일 시 대체 이미지 처리해야 함.
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/w300${data.poster_path})`,
              }}
              onClick={() => {
                window.scrollTo({'top':0})
                navigate(`/movieapp/detail/${data.id}`);
              }}
            >
              <MoviesCardContent data={data} />
            </div>
          );
        })
      ) : (
        <div className={styles.alert}>
          <span>{alert}</span>
        </div>
      )}
    </div>
  );
};

export default MoviesCard;
