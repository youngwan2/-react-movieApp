import { useEffect, useState } from "react";
import styles from "./MoviesCard.module.css";
import { baseSet } from "../../../slice/movieSlice";
import { API_KEY } from "../../../pages/Home";
import { GenreType } from "../../type/MoviesCard";
import { SearchDateTypeMapFunc } from "../../type/MoviesCard";


interface MoviesCardContentType {
  data: SearchDateTypeMapFunc;
}

const MoviesCardContent = ({ data }: MoviesCardContentType) => {
  // 장르 정보를 가져온다.
  const { title, genre_ids, release_date, adult, vote_average, vote_count } =
    data;
  const [genre, setGenre] = useState<GenreType>();
  const genreData = () => {
    baseSet
      .get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        return setGenre(res.data.genres);
      })
      .catch((error) => {
        console.error("genreData:", error);
      });
  };

  useEffect(() => {
    genreData();
  }, []);

  return (
    <section className={styles.movies_card_content}>
      <div className={styles.movies_card_content_inner}>
        <h3 className={styles.movies_card_title}>{title}</h3>
        {genre &&
          genre_ids.map((ids: number, i: number) => {
            return (
              <span
                className={styles.movies_card_genre}
                key={i}
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

        <p>{release_date}</p>
        <p>{adult === false ? "Under 18" : "18+"}</p>
        <p>{vote_average + " P (" + vote_count + " people)"}</p>
      </div>
    </section>
  );
};

export default MoviesCardContent