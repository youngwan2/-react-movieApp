// 각 컴포넌트 타입 지정
interface ReviewsInfoType {
  author: string
  createdAt: string
  content: string
  id?: string
}

interface ReviewType {
  apiData: {
    id: number
    page: number
    results: ReviewsInfoType[]
  }
}

export { type ReviewType, type ReviewsInfoType }
