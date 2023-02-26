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
  const getSearchMovieDate = (inputVal: string) => {
    return baseSet
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

  const inputAppearFunc = () => {
    appear === "" ? setAppear(styles.appear) : setAppear("");
  };

  return (
    <section className={styles.search_section}>
      {/* 헤더 검색창 */}
      <div className={styles.search_icon} id={styles.search_icon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
      </div>

      <div className={`${styles.input_container} ${appear}`}>
        <div className={styles.search_icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
        </div>
        <input
          className={styles.user_input}
          type={"text"}
          onChange={(event) => {
            setInputVal(event.target.value);
          }}
        ></input>
        <div
          className={styles.search_btn}
          onClick={() => {
            if (inputVal !== "") {
              getSearchMovieDate(inputVal);
              navigate("/movies");
            }
          }}
        >
          검색
        </div>
      </div>
    </section>
  );
};

export default Search;
