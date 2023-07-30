import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;

// 기존의 useSelector 훅을 대신하는 훅으로
// 리듀서에서 반환되는 값의 타입을 자신의 타입으로 한다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
