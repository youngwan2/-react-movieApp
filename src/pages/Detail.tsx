import { useState, useEffect, useCallback, SyntheticEvent } from "react";
import styles from "./Detail.module.css";
import { API_KEY } from "./Home";
import DetailTaps from "../components/detail/DetailTaps";
import { useParams } from "react-router-dom";
import { baseSet } from "../slice/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faP } from "@fortawesome/free-solid-svg-icons";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import Player from "../components/detail/Player";

const Detail = () => {
  // 포스터 이미지가 존재하지 않는 경우 해당 에러를 대체하는 이미지를 타겟의 src 주소로 설정
  const imageOnErrorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = process.env.PUBLIC_URL + "/not_find_img.png";
  };

  const { id }: any = useParams();

  //api movie 데이터 state 저장
  const [detailInfo, setDetailInfo] = useState<any>("");
  const [videoAppear, setVideoAppear] = useState(false);

  // movie api 호출
  const idSearchGetMoviesData = useCallback(() => {
    baseSet(`/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => setDetailInfo(res.data))
      .catch((error) => {
        setDetailInfo(error.response.status);
      });
  }, [id]);

  useEffect(() => {
    idSearchGetMoviesData();
  }, [idSearchGetMoviesData]);

  return (
    <section>
      {detailInfo === 404 ? (
        <h1 className={styles.errorMessage}>자료가 존재하지 않습니다.</h1>
      ) : (
        // 영화 커버 이미지
        <div
          className={styles.detail}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${detailInfo.backdrop_path})`,
          }}
        >
          {/*영화 포스터(이미지) */}
          <div className={styles.detail_preview_video}>
            <img
              className={styles.detail_img}
              alt="영화이미지"
              width={400}
              height={500}
              src={`https://image.tmdb.org/t/p/w500${detailInfo.poster_path}`}
              onError={imageOnErrorHandler}
            ></img>
          </div>
          {/* ------영화 관련 정보 섹션------ */}
          <section className={styles.detail_contents}>
            <h1 className={styles.detail_title}>{detailInfo.original_title}</h1>
            <span
              onClick={() => {
                setVideoAppear(true);
              }}
              className={styles.video_icon}
            >
              <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
            </span>
            <div>
              <FontAwesomeIcon className="calendar" icon={faCalendar} />{" "}
              {detailInfo.release_date}
            </div>

            {detailInfo.genres !== undefined
              ? detailInfo.genres.map((data: { id: number; name: string }) => {
                  return (
                    <span key={data.id} className={styles.detail_genres}>
                      {data.name}
                    </span>
                  );
                })
              : null}
            {/* 런타임 */}
            <div className={styles.detail_runtime}>
              <FontAwesomeIcon
                className={"person_running"}
                icon={faPersonRunning}
              />
              {detailInfo.runtime} min
            </div>
            {/* 평점 */}
            <div className={styles.detail_vote_average}>
              <FontAwesomeIcon className="point" icon={faP}></FontAwesomeIcon>
              {Math.ceil(detailInfo.vote_average * 10)} points
              {/* 줄거리 */}
            </div>
            <div className={styles.detail_overview}>{detailInfo.overview}</div>
          </section>
          {videoAppear ? (
            <Player id={id} setAppear={setVideoAppear} appear={videoAppear}>
              {" "}
            </Player>
          ) : null}
        </div>
      )}

      <DetailTaps id={id} />
    </section>
  );
};

export default Detail;
