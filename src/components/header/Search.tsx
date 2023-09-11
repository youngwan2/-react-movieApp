import { useState, KeyboardEvent } from "react";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/movieSlice";
import { useNavigate } from "react-router-dom";
import { sortBySearchData } from "../../slice/sortbySearchSlice";
import { useDispatch } from "react-redux";
import { isDisplay } from "../../slice/sortbySearchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("");
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  // 검색된 영화를 가져오는 API
  const getSearchMovieData = async (inputVal: string) => {
    try {
      const response = await baseSet.get(
        `/3/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&include_adult=false&query=${inputVal}`
      );
      const copy = response.data; // 서버에서 받아온 데이터
      dispatch(sortBySearchData(copy)); // 데이터를 디스패치를 통해 스토어로 전달한다.
    } catch (error) {
      console.error("검색실패:", error);
    }
  };

  // 검색창을 나타나게하거나 사라지게 하는 함수
  const inputAppearFunc = () => {
    display === "" ? setDisplay(styles.display) : setDisplay("");
  };

  // 사용자가 엔터 입력 시 실행되는 함수
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.key;
    if (inputVal !== "" && keyCode === "Enter") {
      navigate("/movieapp/movies");
      getSearchMovieData(inputVal);
      dispatch(isDisplay(false));
      e.currentTarget.value = "";
    }
  };

  return (
    <article className={styles.search}>
      {/* 돋보기 이모티콘 */}
      <span
        className={`${styles.search_icon_outer} ${display}`}
      >
        <FontAwesomeIcon
          className={styles.search_icon}
          icon={faMagnifyingGlass}
          onClick={inputAppearFunc}
        />
      </span>

      {/* 검색창 */}
      <div className={`${styles.search_input_container}`}>
        <label htmlFor="search" className={styles.search_icon_inner}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
        </label>
        <input
          id="search"
          placeholder=""
          className={styles.search_user_input}
          type={"text"}
          onChange={(event) => {
            const copy = event.target.value;
            setInputVal(copy);
            navigate("/movieapp/movies");
          }}
          onKeyDown={onKeyDown}
        ></input>
        <span className={styles.recode_btn}></span>
      </div>
    </article>
  );
};

export default Search;
