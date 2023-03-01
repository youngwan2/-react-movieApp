import React, { useState } from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import { useNavigate } from "react-router-dom";
import { sortBySearchData } from "../../slice/SortBySearchSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [appear, setAppear] = useState("");
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  // 검색된 영화를 가져오는 API
  const getSearchMovieDate = async (inputVal: string) => {
    return await baseSet
      .get(
        `/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputVal}`
      )
      .then((response) => {
        dispatch(sortBySearchData(response.data));
      })
      .catch((error) => {
        console.error("검색실패:", error);
      });
  };

  // 검색창을 나타나게하거나 사라지게 하는 함수
  const inputAppearFunc = () => {
    appear === "" ? setAppear(styles.appear) : setAppear("");
  };

  return (
    <article className={`${styles.search} ${appear}`}>

      <div className={styles.search_input_container}>
        {/* 돋보기 이모티콘 */}
        <label className={styles.search_icon_inner}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
        </label>
        {/* 검색창 */}
        <input
          className={styles.search_user_input}
          type={"text"}
          onChange={(event) => {
            setInputVal(event.target.value);
          }}
        ></input>
        {/* 검색 버튼 */}
        <div className={styles.search_btn_container}>
          <button
            className={styles.search_btn}
            onClick={() => {
              if (inputVal !== "") {
                getSearchMovieDate(inputVal);
                navigate("/movies");
              }
            }}
          >
            🔍︎
          </button>
          <button
            className={styles.search_btn}
            onClick={() => {
              if (inputVal !== "") {
                getSearchMovieDate(inputVal);
                navigate("/movies");
              }
            }}
          >
            ●
          </button>
        </div>
      </div>
    </article>
  );
};

export default Search;
