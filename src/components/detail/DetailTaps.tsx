import styles from "./DetailTaps.module.css";
import { useState, useEffect, useCallback } from "react";
import Similar from "../detail/detailTaps/Similar";
import Review from "../detail/detailTaps/Review";
import Cast from "../detail/detailTaps/Cast";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/movieSlice";
import TopShift from "../movies/TopShift";

/** getApiData 가 각 자식 컴포넌트로 전달될 때 스크롤 시 
 * 반복적으로 호출되는 문제가 있음. 원인을 찾아서 해결해야 함.
 */
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
    switch (menuCount) {
      case 0:
        setChangeTapsData("similar");
        break;
      case 1:
        setChangeTapsData("credits");
        break;
      case 2:
        setChangeTapsData("reviews");
        break;
    }
  }, [menuCount]);

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
            const getData = response.data
            return setGetApiData(getData);
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
    <article className={styles.detail_taps}>
      <div className={styles.tap_menu}>
        {selectMenu.map((count, i) => {
          return (
            // 각 tap 버튼
            <button
              style={
                selectMenu[menuCount] === count
                  ? {
                      color: "white",
                      fontSize:" 18px",
                      backgroundColor: "rgb(229, 171, 12)",
                      boxShadow:
                        " #fff 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px,red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0)",
                    }
                  : { backgroundColor: "transparent" }
              }
              className={styles.tap_btn}
              key={count}
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
    </article>
  );
};
export default DetailTaps;
