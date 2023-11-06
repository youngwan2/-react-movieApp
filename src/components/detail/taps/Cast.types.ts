interface CastListType {
  cast_id: number
  character: string
  name: string
  profile_path: string
}

interface CastType {
  apiData: {
    cast: CastListType[]
  }
}

export { type CastListType, type CastType }
