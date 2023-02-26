import React from "react";
import styles from "./SortBy.module.css";

interface SortByType {
  setCurrentSort: Function;
  optionText: string[];
  optionVal: (string | null)[];
}
const SortBy: React.FC<SortByType> = ({
  setCurrentSort,
  optionText,
  optionVal,
}) => {
  return (
    <div className={styles.sort_by}>
      <div className={styles.sort_by_inner_con}>
        {" "}
        <h3 className={styles.sort_by_title}>sort by</h3>
        <select
          onChange={(e) => {
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
    </div>
  );
};

export default SortBy;
