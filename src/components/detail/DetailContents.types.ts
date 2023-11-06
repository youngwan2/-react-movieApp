interface DetailInfoType {
  backdrop_path: string
  poster_path: string
  title: string
  genres: [{
    id: number
    name: string
  }]
  runtime: number
  vote_average: number
  overview: string
  release_date: string
}

export {type DetailInfoType}