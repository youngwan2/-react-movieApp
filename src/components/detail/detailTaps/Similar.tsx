import React from "react";
import styles from './Similar.module.css'
import { useNavigate } from "react-router-dom";

interface similarType {
  apiData: any;
}

const Similar: React.FC<similarType> = ({ apiData }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.similar}>
      {apiData.results !== undefined
        ? apiData.results.map((movieList: any, i: number) => {
            return (
              <div
                onClick={() => {
                  navigate(`/detail/${movieList.id}`);
                  window.scrollTo(0, 0);
                }}
                className={styles.similar_card}
                key={i}
                style={{
                  backgroundColor: "white",
                  width: "200px",
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage:
                    "url(" +
                    `https://image.tmdb.org/t/p/w500${movieList.poster_path}` +
                    ")",
                }}
              >
                <div className={styles.similar_content}>
                  <h2 className={styles.similar_title}>{movieList.title}</h2>
                  <div className={styles.similar_date}>{movieList.release_date}</div>
                  <div className={styles.similar_age}>
                    {movieList.adult === false ? "Under 18" : "18+"}
                  </div>
                  <div className={styles.similar_grade}>
                    <span>{movieList.vote_average} P</span>
                    <span> ({movieList.vote_count} people)</span>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </section>
  );
};

export default Similar;
