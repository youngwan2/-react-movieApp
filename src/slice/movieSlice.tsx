import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../pages/Home";

//axios 기본 설정
export const baseSet = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: { "content-type": "application/json;charset=utf-8" },
});

//액션 크리에이터 생성
// interface getMovieDataType{
//     [key:string] : object[]
// }

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
      console.log("popular:", error);
    });

    // 평점 높은 영화
  const topRate = baseSet
    .get(`/3/movie/top_rated?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("topRate:", error);
    });

    // 최신 영화
  const latest = baseSet
    .get(`/3/movie/latest?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("last:", error);
    });

    // 개봉 예정 영화
  const isComing = baseSet
    .get(`/3/movie/upcoming?api_key=${API_KEY}&language=kr-US&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("isComing:", error);
    });

    // 장르 리스트 정보 
  const genreData = baseSet
    .get(`/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("genreData:", error);
    });

  let [popularMovie, topRateMovie, isComingMovie, genreInfo, latestMovie] =
    await Promise.all([popular, topRate, isComing, genreData, latest]);
  return { popularMovie, topRateMovie, isComingMovie, genreInfo, latestMovie };
});

const movieSlice = createSlice({
  name: "movieData",
  initialState: {
    data: "",
    status: "WelCome",
  },
  reducers: {},

  extraReducers(builder) {
    builder.addCase(getMovieData.pending, (state) => {
      state.status = "Loading..";
    });
    builder.addCase(getMovieData.fulfilled, (state, action: any) => {
      state.data = action.payload;
      state.status = "Complete!";
    });
  },
});

export default movieSlice;
export { getMovieData };
