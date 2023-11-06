import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* 사용자가 sortBy 를 통해 영화 정보를 검색 시 전달받은 action을 관리하는 리듀서  */
export const sortBySearchSlice = createSlice({
  name: 'searchData',
  initialState: {
    data: '',
    genre: '',
  },
  reducers: {
    sortBySearchData(state, action: PayloadAction<string>) {
      state.data = action.payload
    },
  },
})

/* 페이지네이션의 on/off 유무에 대한 액션을 업데이트하는 리듀서 */
export const paginationDisplaySlice = createSlice({
  name: 'paginationDisplay',
  initialState: true,
  reducers: {
    isDisplay(state, action: PayloadAction<boolean>) {
      return (state = action.payload)
    },
  },
})

export const { sortBySearchData } = sortBySearchSlice.actions
export const { isDisplay } = paginationDisplaySlice.actions
