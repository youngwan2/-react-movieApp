import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_KEY } from "../slice/movieSlice";
import { baseSet } from "../slice/movieSlice";
import { sortbySearchData } from "../slice/sortbySearchSlice";

const MoviesSide = () => {
  const dispatch = useDispatch();
  const [sideBarHidden, setSideBarHidden] = useState(true);
  const [optionText, setOptionText] = useState([
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
  const [optionVal, setOptionVal] = useState([
    "",
    "popularity.desc",
    "popularity.asc",
    "release_date.desc",
    "release_date.asc",
    "revenue.desc",
    "revenue.asc",
    "vote_average.desc",
    "vote_average.asc",
  ]);

  //분류 기준에 따라 다른 영화 리스트를 가져오는 API
  //useCallback 함수를 통해 dispatch 내 함수가 실행될 때만 랜더링
  const getMovieSortBy = (selectVal: any) => {
    if (selectVal === "") {
      return null;
    } else {
      baseSet
        .get(
          `/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectVal}&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        )
        .then((response) => dispatch(sortbySearchData(response.data)))
        .catch((error) => {
          console.log("sortby:", error);
        });
    }
  };

  //selectVal의 값이 바뀔 때만 API 내 함수 실행

  // API에 영화 분류 쿼리 명령어를 전달
  const changeSelectValue = (event: any) => {
    getMovieSortBy(event.target.value);
  };

  return (
    <div className="movie_side">
      {sideBarHidden === true ? (
        <div className="movies_side">
          <button
            className="sidebar_hidden_btn_inner"
            onClick={() => {
              setSideBarHidden(!sideBarHidden);
            }}
          >
            X
          </button>
          <div className="movie_section_container">
            <label htmlFor="sort_by">sort by</label>
            <select
              onChange={changeSelectValue}
              className="movie_side_select"
              id="sort_by"
            >
              {optionText.map((text, i) => {
                return (
                  <option key={i} value={`${optionVal[i]}`}>
                    {text}
                  </option>
                );
              })}
              ;
            </select>
          </div>
        </div>
      ) : null}

      <button
        className="sidebar_hidden_btn"
        onClick={() => {
          setSideBarHidden(!sideBarHidden);
        }}
      >
        ▶
      </button>
    </div>
  );
};

export default MoviesSide;
