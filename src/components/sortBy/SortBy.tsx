import React from "react";
import styles from "./SortBy.module.css";

interface SortByType {
  setCurrentSort: Function;
  optionText: string[];
  optionVal: (string | null)[];
  setPage: Function;
  pageAppear: Function;
}
const SortBy = ({
  setCurrentSort,
  optionText,
  optionVal,
  setPage,
  pageAppear,
}: SortByType) => {
  return (
    <article className={styles.sort_by}>
      <div className={styles.sort_by_inner_con}>
        {" "}
        <h3 className={styles.sort_by_title}>sort by</h3>
        {/* select 옵션 선택 시 실행 */}
        <select
          onChange={(e) => {
            pageAppear(true);
            setPage(1);
            setCurrentSort(e.target.value);
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
