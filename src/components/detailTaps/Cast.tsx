import React, { SyntheticEvent } from "react";

interface castType {
  apiData: any;
}
const Cast: React.FC<castType> = ({ apiData }) => {
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "/not-profile.png";
  }
  return (
    <div className="cast">
      {apiData.cast !== undefined
        ? apiData.cast.map((cast: any, i: number) => {
            return (
              <div className="cast_info" key={i}>
                <img
                  className="cast_img"
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt="profile_img"
                  onError={imageOnErrorHandler}
                ></img>
                <h4 className="cast_name">{cast.name}</h4>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Cast;
