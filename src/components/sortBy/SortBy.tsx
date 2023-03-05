import React, { useState } from "react";
import styles from "./SortBy.module.css";
import { useDispatch } from "react-redux";
import { isDisplay } from "../../slice/SortBySearchSlice";

interface SortByType {
  setCurrentSort: Function;
  setPage: Function;
  isDisplayVal: boolean;
}
const SortBy = ({ setCurrentSort, setPage, isDisplayVal }: SortByType) => {
  const dispatch = useDispatch();

  // sortBy 메뉴 선택 시 하단 페이지네이션이 보이지 않는다면, 보이게 설정하는 함수
  const paginationDisplayHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isDisplayVal ? dispatch(isDisplay(true)) : null;
  };

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

  return (
    <article className={styles.sort_by}>
      <div className={styles.sort_by_inner_con}>
        {" "}
        <h3 className={styles.sort_by_title}>sort by</h3>
        {/* select 옵션 선택 시 실행 */}
        <select
          onChange={(e) => {
            //다른 sortBy 관련 메뉴(장르, 연도)에서 해당 sortBy 메뉴의 옵션 선택 시
            // 초기 페이지를 1로 되돌린다.
            setPage(1);
            //sortBy 옵션 중 하나를 선택하면 해당 옵션의 정렬 리스트를 불러온다.
            setCurrentSort(e.target.value);

            //페이지네이션 온/오프를 조작하는 함수
            paginationDisplayHandler();
          }}
          className={styles.sort_by_select}
        >
          {optionText.map((text, i) => {
            return (
              <option key={Math.random() * 10000 * i} value={`${optionVal[i]}`}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
    </article>
  );
};

export default SortBy;
