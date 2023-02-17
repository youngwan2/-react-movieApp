import React, { SyntheticEvent } from "react";
import styles from "./Cast.module.css";

interface castType {
  apiData: any;
}
const Cast: React.FC<castType> = ({ apiData }) => {
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/not-profile.png";
  };
  return (
    <div className={styles.cast}>
      {apiData.cast !== undefined
        ? apiData.cast.map((cast: any, i: number) => {
            return (
              <div className={styles.cast_info} key={Math.random() * 10000}>
                <img
                  className={styles.cast_img}
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt="profile_img"
                  onError={imageOnErrorHandler}
                ></img>
                <h4 className={styles.cast_name}>{cast.name}</h4>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Cast;
