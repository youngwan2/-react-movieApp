import React from "react";
import styles from "./SortByGenre.module.css";
import { baseSet } from "../../slice/MovieSlice";
import { API_KEY } from "../../pages/Home";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sortBySearchData } from "../../slice/SortBySearchSlice";

//장르정보를 가져오는 API 로 전달할 인자의 타입이다.
type genreType = {
  id: number;
  name: string;
};

interface SortByGenreType {
  setPage: Function;
  pageAppear: Function;
}

const SortByGenre = ({ setPage, pageAppear }: SortByGenreType) => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState<any>("");

  const genreInfo = async () => {
    await baseSet
      .get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        return setGenre(response.data.genres);
      })
      .catch((result) => console.log(result));
  };

  //장르 정보 가져온다.
  useEffect(() => {
    genreInfo();
  }, []);

  const getMovieSortByGenre = async (selectGenre: number) => {
    await baseSet
      .get(
        `/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres=${selectGenre}&with_watch_monetization_types=flatrate`
      )
      .then((response) => {
        dispatch(sortBySearchData(response.data));
      })
      .catch((error) => {
        console.log("sortByGenreError:", error);
      });
  };

  //장르유형에 따른 영화정보를 가져온다.

  return (
    <div className={styles.sortByGenre}>
      <h3 className={styles.sortByGenre_title}>Genre</h3>
      {genre !== "" ? (
        genre.map((genreEl: genreType, i: number) => {
          return (
            <button
              className={styles.sortByGenre_keyword}
              key={i}
              onClick={() => {
                setPage(1);
                pageAppear(false);
                getMovieSortByGenre(genreEl.id);
              }}
            >
              {genreEl.name}
            </button>
          );
        })
      ) : (
        <button>나옴</button>
      )}
    </div>
  );
};

export default SortByGenre;
