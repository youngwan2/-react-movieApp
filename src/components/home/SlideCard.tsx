import React from "react";
import styles from "./SlideCard.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlideCardType } from "../type/SlideCardType";

const SlideCard: React.FC<SlideCardType> = ({ movieList }) => {
  const navigate = useNavigate();
  type genreReduxType = {
    movies: {
      data: {
        genreInfo: {
          genres: [{ id: number; name: string }];
        };
      };
    };
  };

  type genreArrayType = {
    id: number;
    name: string;
    find: Function;
  };

  const genre = useSelector<genreReduxType>((state) => {
    return state.movies.data.genreInfo.genres;
  }) as genreArrayType;

  return (
    <section
      onClick={() => {
        navigate(`/detail/${movieList.id}`);
      }}
      className={styles.slide_card}
    >
      <div
        style={{
          width: "360px",
          height: "200px",
          borderRadius: "15px",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundImage:
            "url(" +
            `https://image.tmdb.org/t/p/w500${movieList.poster_path}` +
            ")",
        }}
      >
        <div className={styles.overlay}>
          <h2>{movieList.title}</h2>
          {movieList.genre_ids.map((ids: number) => {
            return (
              <span className={styles.genre} key={Math.random() * 10000}>
                {genre.find((g: genreArrayType) => g.id === ids).name}
              </span>
            );
          })}
          <p>{movieList.release_date}</p>
          <p>{movieList.adult ? "성인" : "청소년가능"}</p>
          <div>
            <span>{movieList.vote_average}P (</span>
            <span>{movieList.vote_count}people)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideCard;
