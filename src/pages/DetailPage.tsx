import { type ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import { API_KEY } from './HomePage'
import DetailTaps from '../components/detail/DetailTaps'
import { useParams } from 'react-router-dom'
import { baseSet } from '../store/slice/movieSlice'

/* 영상(예고편) 플레이어 */
import Spinner from '../components/spinner/Spinner'
import DetailContents from '../components/detail/DetailContents'

const Detail = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const { id } = useParams<string>() || 0

  const { data: getDetailInfo, isLoading } = useQuery({
    queryKey: ['detail', id],
    queryFn: async () => await getDetailMoviesInfoFromTmDb(String(id))
  })

  // movie api 호출
  const getDetailMoviesInfoFromTmDb = async (id: string): Promise<any> => {
    const response = await baseSet(
      `/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    )
    if (!(response.status === 200)) throw new Error('Network error')
    return response.data
  }

  return (
    <section>
      {isLoading
        ? <Spinner />
        : <DetailContents detailInfo ={ getDetailInfo } id = { id }/>
      }
      <DetailTaps id={Number(id)} />
    </section>
  )
}

export default Detail
