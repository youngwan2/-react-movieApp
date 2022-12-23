import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { API_KEY } from "../slice/movieSlice";
import DetailTaps from "../components/DetailTaps";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Detail = () => {


  const imageOnErrorHandler = (e:SyntheticEvent<HTMLImageElement>) =>{
      e.currentTarget.src = '/not_find_img.png'
  }


  const { id }:any = useParams();

  //api movie 데이터 state 저장
  const [detailInfo, setDetailInfo] = useState<any>("");

  // movie api 호출
  const idSearchGetMoviesData = useCallback(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => setDetailInfo(res.data))
      .catch((error) => {
        setDetailInfo(error.response.status)
      });
  }, [id]);

  useEffect(() => {
    idSearchGetMoviesData();
  }, [idSearchGetMoviesData]);

  return (
      <div>
        {detailInfo === 404?
        <h1>자료가 존재하지 않습니다.</h1>
      :<div className="detail"
          style={{
            backgroundPosition:"center",
            backgroundSize:'cover',
            backgroundImage:"url("+`https://image.tmdb.org/t/p/w500${detailInfo.backdrop_path}`+")"
          }}>
        <img
          className="detail_img"
          alt="영화이미지"
          width={400}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${detailInfo.poster_path}`}
          onError={imageOnErrorHandler}
      ></img>

        <section className="detail_contents">
          <h1 className="detail_title">{detailInfo.original_title}</h1>
          <div>{detailInfo.release_date}</div>
          {detailInfo.genres !== undefined
            ? detailInfo.genres.map((data: any, i: number) => {
                return (
                  <span key={i} className="detail_genres">
                    {data.name}
                  </span>
                );
              })
            : null}
          <div className="detail_runtime">{detailInfo.runtime}분</div>
          <div className="detail_vote_average">
            {Math.ceil(detailInfo.vote_average*10)}점
          </div>

          <div className="detail_overview">{detailInfo.overview}</div>
        </section>
      </div>}

      <DetailTaps id={id} />
      </div>
  );
};

export default Detail;
