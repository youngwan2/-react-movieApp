import React from "react";
import styles from "./MovieSide.module.css"
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import { sortBySearchData } from "../../slice/SortBySearchSlice";
import SortBy from "../sortBy/SortBy";
import SortByData from "../sortBy/SortByDate";
import SortByGenre from "../sortBy/SortByGenre";

const MoviesSide = () => {
  const dispatch = useDispatch();

  // 좌측 sort tap 의 온 오프 상태
  const [sideBarHandle, setSideBarHandle] = useState(true);

  //sort by 의 select
  const [optionText] = useState([
    "분류선택",
    "인기있는",
    "인기없는",
    "최근에 언급된",
    "오래된",
    "수익 높은",
    "수익 낮은",
    "평점 높은",
    "평점 낮은",
  ]);
  const [optionVal] = useState([
    null,
    "popularity.desc",
    "popularity.asc",
    "release_date.desc",
    "release_date.asc",
    "revenue.desc",
    "revenue.asc",
    "vote_average.desc",
    "vote_average.asc",
  ]);

  const [currentSort, setCurrentSort] = useState("");

  //분류 기준에 따라 다른 영화 리스트를 가져오는 API
  //useCallback 함수를 통해 dispatch  될 때 api 호출
  const getMovieSortBy = useCallback(
    (selectVal: string) => {
      if (selectVal === "") return null;
      else {
        baseSet
          .get(
            `/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectVal}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
          )
          .then((response) => dispatch(sortBySearchData(response.data)))
          .catch((error) => {
            console.log("sortBy:", error);
          });
      }
    },
    [dispatch]
  );

  //selectVal이나 현재 페이지 숫자가 바뀔 때만 API 내 함수 실행

  useEffect(() => {
    getMovieSortBy(currentSort);
  }, [currentSort, getMovieSortBy]);

  return (
    <div className={styles.movie_side}>
      {sideBarHandle === true ? (
        <div className={styles.movie_side_inner}>
          {/* side tap 닫는 버튼 */}
          <button
            className={styles.sidebar_hidden_btn_inner}
            onClick={() => {
              setSideBarHandle(!sideBarHandle);
            }}
          >
            X
          </button>

          {/*side tap 콘텐츠 중 sort by 영역  */}
          <SortBy
            setCurrentSort={setCurrentSort}
            optionText={optionText}
            optionVal={optionVal}
          />
          {/* 연도별 영화 정보 가져옴 */}
          <SortByData />
          {/* 장르별로 영화 정보 가져옴 */}
          <SortByGenre />
        </div>
      ) : null}

      {/* 좌측의 sort tap 여는 버튼 */}
      <button
        className={styles.sidebar_hidden_btn}
        onClick={() => {
          setSideBarHandle(!sideBarHandle);
        }}
      >
        ▶
      </button>
    </div>
  );
};

export default MoviesSide;
