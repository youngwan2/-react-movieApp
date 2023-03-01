// 유사영화 리스트의 타입
interface SimilarMovieListType {
    id: string;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
  }
  
  // 유사 영화 리스트의 내용들 타입
  interface SimilarContentType {
    title: string;
    release_date: string;
    adult: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  // Similar 컴포넌트의 타입
  interface SimilarType {
    apiData: {
      results: SimilarMovieListType[];
    };
  }

  export {SimilarMovieListType,SimilarContentType,SimilarType}