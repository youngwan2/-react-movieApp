import styles from "./SlideCard.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlideCardType } from "../type/SlideCardType";

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

const SlideCard = ({ movieList }: SlideCardType) => {
  const navigate = useNavigate();

  const genre = useSelector<genreReduxType>((state) => {
    return state.movies.data.genreInfo.genres;
  }) as genreArrayType;

  return (
    <section
      onClick={() => {
        window.scrollTo({ top: 0 });
        navigate(`/movieapp/detail/${movieList.id}`);
      }}
      className={styles.slide_card}
    >
      {/* 영화 이미지 */}
      <div
        style={{
          height: "250px",
          borderRadius: "5px",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieList.poster_path})`,
        }}
      >
        {/* 영화 정보 */}
        <div className={styles.slide_card_contents}>
          <h2 className={styles.title}>{movieList.title}</h2>
          {movieList.genre_ids.map((ids: number) => {
            return (
              <span className={styles.genre} key={ids}>
                {genre.find((g: genreArrayType) => g.id === ids).name}
              </span>
            );
          })}
          <p>{movieList.release_date}</p>
          <p>{movieList.adult ? "18 +" : "Under 18"}</p>
          <div>
            <span>{movieList.vote_average} P (</span>
            <span>{movieList.vote_count} people)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideCard;
