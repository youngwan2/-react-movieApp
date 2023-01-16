export interface playerStateType {
    movies: {
      data: string;
      status: string;
    };
    sortbySearch: {
      data: string;
    };
    detailTaps: {
      data: string;
    };
    pageInfo: number;
    playState: boolean;
  }