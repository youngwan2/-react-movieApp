import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageInfoCommunicator } from "../slice/pageInfoSlice";
import { useNavigate } from "react-router-dom";

const Pagination = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(120);
  const [pageRender, setPageRender] = useState<any>([""]);

  let realCurrentPage = useSelector((state: any) => {
    return state.pageInfo;
  });
  console.log(realCurrentPage);

  //페이지네이션 그리는 함수
  const render: any = useCallback(
    (realCurrentPage: number, totalPage: number) => {
      //현재 페이지 그룹
      let pageGroup = Math.ceil(realCurrentPage / 5);
      //마지막 페이지 번호
      let lastPage = pageGroup * 5;
      //첫 페이지 번호
      let firstPage = lastPage - 4;

      let pagination = [];
      if (realCurrentPage > 1)
        // 페이지네이션 <<, < 영역
        pagination.push(
          <li
            className="pagination_list"
            onClick={() => {
              dispatch(pageInfoCommunicator(1));
            }}
          >
            {"<<"}
          </li>,
          <li
            className="pagination_list"
            onClick={() => {
              if (realCurrentPage > 0)
                dispatch(pageInfoCommunicator(realCurrentPage - 1));
              else return dispatch(pageInfoCommunicator(1));
            }}
          >
            {"<"}
          </li>
        );
      else if (realCurrentPage < 1) {
        navigate("/movies");
      }

      // 페이지네이션 번호 영역
      for (let i = firstPage; i <= lastPage; i++) {
        pagination.push(
          <li
            className={"pagination_list"}
            onClick={(e) => {
              if (Number(e.currentTarget.innerHTML) <= totalPage)
                dispatch(
                  pageInfoCommunicator(Number(e.currentTarget.innerHTML))
                );
              else if (Number(e.currentTarget.innerHTML) > totalPage)
                return dispatch(pageInfoCommunicator(120));
            }}
          >
            {i}
          </li>
        );
      }

      //페이지네이션 >,>> 영역
      if (realCurrentPage !== totalPage)
        pagination.push(
          <li
            className="pagination_list"
            onClick={() => {
              if (realCurrentPage <= 120)
                dispatch(pageInfoCommunicator(realCurrentPage + 1));
              else if (realCurrentPage > 120)
                return dispatch(pageInfoCommunicator(totalPage));
            }}
          >
            {">"}
          </li>,
          <li
            className="pagination_list"
            onClick={() => {
              dispatch(pageInfoCommunicator(totalPage));
            }}
          >
            {">>"}
          </li>
        );

      setPageRender(pagination);
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    render(realCurrentPage, totalPage);
  }, [render, realCurrentPage, totalPage]);

  return (
    <ul className="pagination">
      {pageRender.map((el: any, i: number) => {
        return (
          <span className="pagination_span" key={i}>
            {el}
          </span>
        );
      })}
    </ul>
  );
};

export default Pagination;
