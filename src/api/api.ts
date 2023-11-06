import { baseSet } from '../store/slice/movieSlice'
import { API_KEY } from '../pages/HomePage'

export const getMovieSortBy = async (selectVal: string = 'popularity.desc', pageNumber: number): Promise<any> => {
  const response = await baseSet.get(
    `/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${selectVal}&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`
  )
  if (!(response.status === 200)) throw new Error('Network error')
  return response.data
}
