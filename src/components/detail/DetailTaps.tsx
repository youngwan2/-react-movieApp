import React from "react";
import styles from "./DetailTaps.module.css";
import { useState, useEffect, useCallback } from "react";
import Similar from "../detail/detailTaps/Similar";
import Review from "../detail/detailTaps/Review";
import Cast from "../detail/detailTaps/Cast";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import TopShift from "../movies/TopShift";

interface TapsTypes {
  id: number;
}

const DetailTaps: React.FC<TapsTypes> = ({ id }) => {
  // 유사한 영화, 캐스트정보, 리뷰정보가 분기되어 getApiData에 할당됨.
  const [getApiData, setGetApiData] = useState<any>("");
  const [changeTapsData, setChangeTapsData] = useState("");
  const [selectMenu] = useState(["Similar", "Cast", "Review"]);
  const [menuCount, setMenuCount] = useState(0);

  //하단 탭스 클릭 시 해당 value를 api에 전달해주는 함수
  const RespondToTabsChanges = useCallback(() => {
    let copy = changeTapsData;
    if (menuCount === 0) {
      copy = "similar";
      return setChangeTapsData(copy);
    } else if (menuCount === 1) {
      copy = "credits";
      return setChangeTapsData(copy);
    } else if (menuCount === 2) {
      copy = "reviews";
      return setChangeTapsData(copy);
    } else {
      return null;
    }
  }, [menuCount, changeTapsData]);

  useEffect(() => {
    RespondToTabsChanges();
  }, [RespondToTabsChanges]);

  //세부적인 영화 정보에 대한 GET API 호출
  const getDetailTapsData = useCallback(
    async (value: string) => {
      if (value !== "")
        await baseSet
          .get(
            `/3/movie/${id}/${value}?api_key=${API_KEY}&language=en-US&page=1`
          )
          .then((response) => {
            return setGetApiData(response.data);
          })
          .catch((error) => {
            console.error("tapsError:", error);
          });
    },
    [id]
  );

  // 각  tap 에 해당하는 API 데이터를 가져온다.
  useEffect(() => {
    if (changeTapsData !== undefined) {
      getDetailTapsData(changeTapsData);
    }
  }, [getDetailTapsData, changeTapsData]);

  return (
    <div className={styles.detail_taps}>
      <div className={styles.tap_menu}>
        {selectMenu.map((count, i) => {
          return (
            <button
              className={styles.tap_btn}
              key={Math.random() * 10000 * i}
              onClick={() => {
                let selectNum = [i];
                let copy = [...selectNum];
                return setMenuCount(copy[0]);
              }}
            >
              {count}
            </button>
          );
        })}
      </div>

      {/* 디테일 페이지 화면 하단의 tap 영역 */}
      {changeTapsData === "similar" ? <Similar apiData={getApiData} /> : null}
      {changeTapsData === "credits" ? <Cast apiData={getApiData} /> : null}
      {changeTapsData === "reviews" ? <Review apiData={getApiData} /> : null}
      {/* 상단 이동 버튼 */}
      <TopShift />
    </div>
  );
};
export default DetailTaps;
