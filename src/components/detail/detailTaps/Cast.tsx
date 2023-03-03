import React, { SyntheticEvent } from "react";
import styles from "./Cast.module.css";
import NotFind from "./NotFind";

interface CastListType {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string;
}
interface CastType {
  apiData: {
    cast: CastListType[];
  };
}
const Cast = ({ apiData }: CastType) => {
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = process.env.PUBLIC_URL +"/not-profile.png";
  };
  return (
    <div className={styles.cast}>
      {apiData.cast && apiData.cast[0] !== undefined ? (
        apiData.cast.map((cast: CastListType,i) => {
          return (
            <section className={styles.cast_info} key={i}>
              <img
                className={styles.cast_img}
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt="profile_img"
                onError={imageOnErrorHandler}
              ></img>
              <h4 className={styles.cast_name}>{cast.name}</h4>
              <p style={{ color: "white" }}>{"(" + cast.character + ")"}</p>
            </section>
          );
        })
      ) : (
        <NotFind />
      )}
    </div>
  
  );
  
};

export default Cast;
