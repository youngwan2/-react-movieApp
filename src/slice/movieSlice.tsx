import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../pages/Home";
import { RootState } from "../store";

//axios 기본 설정(이 설정을 통해 아래에 설정된 부분을 단축하여 표현할 수 있다.)
export const baseSet = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: { "content-type": "application/json;charset=utf-8" },
});

const getMovieData = createAsyncThunk("GET/movieData", async () => {
  //  인기영화
  const popular = baseSet
    .get(
      `/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("popular:", error);
    });

  // 평점 높은 영화
  const topRate = baseSet
    .get(`/3/movie/top_rated?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("topRate:", error);
    });

  // 최신 영화
  const latest = baseSet
    .get(`/3/movie/latest?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("last:", error);
    });

  // 개봉 예정 영화
  const isComing = baseSet
    .get(`/3/movie/upcoming?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("isComing:", error);
    });

  // 장르 리스트 정보
  const genreData = baseSet
    .get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("genreData:", error);
    });

  const [popularMovie, topRateMovie, isComingMovie, genreInfo, latestMovie] =
    await Promise.all([popular, topRate, isComing, genreData, latest]);
  return { popularMovie, topRateMovie, isComingMovie, genreInfo, latestMovie };
});

// ================================================================

// 슬라이스를 생성한다.
const movieSlice = createSlice({
  name: "movieData",
  initialState: {
    data: "",
    status: "WelCome",
  },
  // reducers 는 동기적으로 실행되는 레듀서 처리
  reducers: {},

  // extraReducers 는 비동기적으로 실행되는 레듀서 처리
  // 기본적으로 보류, 이행, 거부 로 나눠서 각 단계의 이행 여부에 따라 각 상황에 맞는 명령을 실행한다.
  extraReducers(builder) {
    builder.addCase(getMovieData.pending, (state) => {
      state.status = "Loading..";
    });
    builder.addCase(
      getMovieData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.status = "Complete!";
      }
    );
  },
});

export default movieSlice.reducer;
export { getMovieData };
