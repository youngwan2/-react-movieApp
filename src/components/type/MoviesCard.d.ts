export type SearchDateType = {
  sortBySearch: {
    data: {
      results: [
        {
          id: number;
          adult: boolean;
          genre_ids: number[];
          overview: string;
          poster_path: string;
          release_date: string;
          title: string;
          vote_average: number;
          vote_count: number;
        }
      ];
    };
  };
};

export type SearchDateTypeMapFunc = {
  id: number;
  adult: boolean;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};


export type GenreType = {
    find:Function;
    id:number;
    name:string;
  
}