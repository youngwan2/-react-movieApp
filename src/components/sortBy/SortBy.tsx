import React from "react";


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
    <div className="sort_by">
      <label htmlFor="sort_by">sort by</label>
      <select
        onChange={(e) => {
          setCurrentSort(e.target.value);
        }}
        className="select"
        id="sort_by"
      >
        {optionText.map((text, i) => {
          return (
            <option key={Math.random()*10000} value={`${optionVal[i]}`}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortBy;
