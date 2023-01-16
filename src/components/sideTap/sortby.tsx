import React from "react";
import { useDispatch } from "react-redux";

interface SortbyType {
  pageInfoCommunicator: Function;
  setCurrentSort: Function;
  optionText: string[];
  optionVal: (string | null)[];
}
const Sortby: React.FC<SortbyType> = ({
  pageInfoCommunicator,
  setCurrentSort,
  optionText,
  optionVal,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="movie_section_container">
      <label htmlFor="sort_by">sort by</label>
      <select
        onChange={(e) => {
          setCurrentSort(e.target.value);
          dispatch(pageInfoCommunicator(1));
        }}
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
      </select>
    </div>
  );
};

export default Sortby;
