import React from "react";
import styles from "./MovieSide.module.css";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import { sortBySearchData } from "../../slice/SortBySearchSlice";
import SortBy from "../sortBy/SortBy";
import SortByData from "../sortBy/SortByDate";
import SortByGenre from "../sortBy/SortByGenre";
import Pagination from "../sortBy/pagination/Pagination";

const MoviesSide = () => {
  const dispatch = useDispatch();

  //  Movies 페이지 접속 시 기본은 sortBy의 인기순을 값으로 한다.
  // 그 외 filter나 genre 별 검색 시에 페이지네이션 영역은 일반적으로 보이지 않도록 설정
  // 즉, sortBy 를 제외하고, sortByDate, sortByGenre 때는 안보이게 설정함.
  const [paginationAppear, setPaginationAppear] = useState(true);
  const [barHiddenState, setBarHiddenState] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  //sort by 의 select
  const [optionText] = useState([
    "Selection",
    "Popular",
    "Unpopular",
    "Recent",
    "Old",
    "High profit",
    "Low profit",
    "High rating",
    "Low rating",
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

  // 분류별 영화 정보 저장
  const [currentSort, setCurrentSort] = useState("");

  // 사이드바 나타나기/숨기기 함수
  const [display, setDisplay] = useState("");
  const sidebarAppearFunc = () => {
    setBarHiddenState((barHiddenState) => !barHiddenState);
    barHiddenState ? setDisplay(styles.sidebar_appear) : setDisplay("");
  };

  //분류 기준에 따라 다른 영화 리스트를 가져오는 API
  //useCallback 함수를 통해 dispatch  될 때 api 호출
  const getMovieSortBy = useCallback(
    async (selectVal: string) => {
      if (!selectVal) selectVal = "popularity.desc"; //아무 선택이 없을 때 기본 값
      await baseSet
        .get(
          `/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectVal}&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`
        )
        .then((response) => dispatch(sortBySearchData(response.data)))
        .catch((error) => {
          console.error("sortBy:", error);
        });

      return;
    },
    [dispatch, pageNumber]
  );

  //selectVal이나 현재 페이지 숫자가 바뀔 때만 API 내 함수 실행

  useEffect(() => {
    getMovieSortBy(currentSort);
  }, [currentSort, getMovieSortBy]);

  return (
    <article className={styles.movie_side}>
      <div className={`${styles.movie_side_inner} ${display}`}>
        {/* side tap 닫는 버튼 */}
        <button
          className={styles.sidebar_hidden_btn_inner}
          onClick={sidebarAppearFunc}
        >
          X
        </button>

        {/*side tap 콘텐츠 중 sort by 영역  */}
        <SortBy
          setCurrentSort={setCurrentSort}
          optionText={optionText}
          optionVal={optionVal}
          setPage={setPageNumber}
          pageAppear={setPaginationAppear}
        />
        {/* 연도별 영화 정보 가져옴 */}
        <SortByData setPage={setPageNumber} pageAppear={setPaginationAppear} />
        {/* 장르별로 영화 정보 가져옴 */}
        <SortByGenre setPage={setPageNumber} pageAppear={setPaginationAppear} />
      </div>

      {/* 좌측의 sort tap 여는 버튼 */}
      <button className={styles.sidebar_hidden_btn} onClick={sidebarAppearFunc}>
        ▶
      </button>

      {/* 페이지네이션 표시 영역 */}
      {paginationAppear ? (
        <Pagination setPage={setPageNumber} currentPageNum={pageNumber} />
      ) : null}
    </article>
  );
};

export default MoviesSide;
