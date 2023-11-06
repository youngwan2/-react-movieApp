import styles from './DetailTaps.module.css'
import { type ReactElement, useState } from 'react'
import Similar from './taps/Similar'
import Review from './taps/Review'
import Cast from './taps/Cast'
import { API_KEY } from '../../pages/HomePage'
import { baseSet } from '../../store/slice/movieSlice'
import TopShift from '../movies/TopShift'
import { useQuery, useQueryClient } from '@tanstack/react-query'

/** getApiData 가 각 자식 컴포넌트로 전달될 때 스크롤 시
 * 반복적으로 호출되는 문제가 있음. 원인을 찾아서 해결해야 함.
 */
interface TapsTypes {
  id: number
}

const DetailTaps = ({ id }: TapsTypes): ReactElement => {
  // 유사한 영화, 캐스트정보, 리뷰정보가 분기되어 getApiData에 할당됨.
  const [changeTapsData, setChangeTapsData] = useState('similar')
  const [selectIndex, setSelectIndex] = useState(0)
  const [selectMenu] = useState(['similar', 'cast', 'reviews'])

  const switchTaps = (tapIndex: number): void => {
    switch (tapIndex) {
      case 0: {
        setChangeTapsData('similar')
        return
      }
      case 1: {
        setChangeTapsData('credits')
        return
      }
      case 2: {
        setChangeTapsData('reviews')
      }
    }
  }
  const queryClient = useQueryClient()
  const { data: getInfoByTaps, isLoading } = useQuery({
    queryKey: ['taps', id, changeTapsData],
    queryFn: async () => await getDetailTapsData(id, changeTapsData)
  })

  const reRequestFromTmDb = (): void => {
    queryClient
      .invalidateQueries({ queryKey: ['taps', id, changeTapsData] })
      .catch(console.error)
  }

  const getDetailTapsData = async (
    id: number,
    value: string = 'similar'
  ): Promise<any> => {
    if (value !== '') {
      const response = await baseSet.get(
        `/3/movie/${id}/${value}?api_key=${API_KEY}&language=ko-KR&page=1`
      )
      return response.data
    }
  }

  return (
    <article className={styles.detail_taps}>
      <div className={styles.tap_menu}>
        {selectMenu.map((menu, i) => {
          return (
            // 각 tap 버튼
            <button
              style={
                selectMenu[selectIndex] === menu
                  ? {
                      color: 'white',
                      fontSize: ' 18px',
                      backgroundColor: 'rgb(229, 171, 12)',
                      boxShadow:
                        ' #fff 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px,red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0)'
                    }
                  : { backgroundColor: 'transparent' }
              }
              className={styles.tap_btn}
              key={menu}
              onClick={() => {
                const selectIndex = i
                setSelectIndex(i)
                switchTaps(selectIndex)
                setTimeout(() => {
                  reRequestFromTmDb()
                }, 100)
              }}
            >
              {menu}
            </button>
          )
        })}
      </div>

      {/* 디테일 페이지 화면 하단의 tap 영역 */}
      { !isLoading && changeTapsData === 'similar'
        ? <Similar apiData={getInfoByTaps} />
        : null}
      { !isLoading && changeTapsData === 'credits'
        ? <Cast apiData={getInfoByTaps} />
        : null}
      { !isLoading && changeTapsData === 'reviews'
        ? <Review apiData={getInfoByTaps} />
        : null}
      {/* 상단 이동 버튼 */}
      <TopShift />
    </article>
  )
}
export default DetailTaps
