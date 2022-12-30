import React from "react";
import { useState,useEffect,useCallback} from "react";
import { useDispatch,useSelector } from "react-redux";
import { API_KEY } from "../slice/movieSlice";
import { baseSet } from "../slice/movieSlice";
import { sortbySearchData } from "../slice/sortbySearchSlice";
import { pageInfoCommunicator } from "../slice/pageInfoSlice";


const MoviesSide = () => {

 const [totalPage, setTotalPage] = useState(120);

 const currentPage = useSelector((state:any)=>{return state.pageInfo});
 console.log("현재페이지:",currentPage);



  const dispatch = useDispatch();

  // 좌측 sort tap 의 온 오프 상태
  const [sideBarHidden, setSideBarHidden] = useState(true);

  //sort by 의 select 에 
  const [optionText, setOptionText] = useState([
    "분류선택", "인기있는", "인기없는", "최근에 언급된", "오래된",
    "수익 높은","수익 낮은","평점 높은","평점 낮은",
  ]);
  const [optionVal, setOptionVal] = useState([
    null,
    "popularity.desc","popularity.asc","release_date.desc",
    "release_date.asc","revenue.desc", "revenue.asc",
    "vote_average.desc","vote_average.asc",
  ]);

  const [currentSort,setCurrentSort] = useState('');



  //분류 기준에 따라 다른 영화 리스트를 가져오는 API
  //useCallback 함수를 통해 dispatch  될 때 api 호출

  const getMovieSortBy = useCallback((selectVal: any,currentPage:number) => {
      if(currentPage <1) return currentPage = 1;
      if(selectVal === "") return null;
      else {
        baseSet.get(`/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectVal}&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`)
               .then((response) => dispatch(sortbySearchData(response.data)))
               .catch((error) => { console.log("sortby:", error);});
      }
    },[dispatch]);

  //selectVal이나 현재 페이지 숫자가 바뀔 때만 API 내 함수 실행

  useEffect(()=>{
    getMovieSortBy(currentSort,currentPage);
  },[currentSort,currentPage,getMovieSortBy])
  
  return (
    <div className="movie_side">
      {sideBarHidden === true ? (
        <div className="movies_side">

          {/* side tap 닫는 버튼 */}
          <button
            className="sidebar_hidden_btn_inner"
            onClick={() => {
              setSideBarHidden(!sideBarHidden);
            }}
          >
            X
          </button>

          {/*side tap 콘텐츠 중 sort by 영역  */}
          <div className="movie_section_container">
            <label htmlFor="sort_by">sort by</label>
            <select
              onChange={(e)=>{setCurrentSort(e.target.value); dispatch(pageInfoCommunicator(1))}}
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

    {/* 좌측의 sort tap 여는 버튼 */}
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
