import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MoviesCard.module.css";
import {
  SearchDateType,
  SearchDateTypeMapFunc,
  GenreType,
} from "../type/MoviesCard";
import { baseSet } from "../../slice/MovieSlice";
import { API_KEY } from "../../pages/Home";

//타입지정

//컴포넌트
const MoviesCard = () => {
  const navigate = useNavigate();
  const searchDate = useSelector((state: SearchDateType) => {
    return state.sortBySearch.data.results;
  });

  // 장르 정보를 가져온다.
  const [genre, setGenre] = useState<GenreType>();
  const genreData = () => {
    baseSet
      .get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        return setGenre(res.data.genres);
      })
      .catch((error) => {
        console.log("genreData:", error);
      });
  };

  useEffect(() => {
    genreData();
  }, []);

  return (
    <div className={styles.movies_card}>
      {searchDate
        ? searchDate.map((data: SearchDateTypeMapFunc, i: number) => {
            return (
              <div
                key={Math.random() * 10000 * i}
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
                <div className={styles.movies_card_content}>
                  <div className={styles.card_content_inner_con}>
                    <h3 className={styles.movies_card_title}>{data.title}</h3>
                    {genre &&
                      data.genre_ids.map((ids: number, i: number) => {
                        return (
                          <span
                            className={styles.movies_card_genre}
                            key={Math.random() * 10000 * i}
                          >
                            {
                              genre.find(
                                (genreEl: { id: number; name: string }) =>
                                  genreEl.id === ids
                              ).name
                            }
                          </span>
                        );
                      })}

                    <div>{data.release_date}</div>
                    <div>{data.adult === false ? "Under 18" : "18+"}</div>
                    <div>
                      {data.vote_average +
                        " P (" +
                        data.vote_count +
                        " people)"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MoviesCard;
