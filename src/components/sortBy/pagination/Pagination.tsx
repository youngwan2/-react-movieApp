import React, { useEffect, useState, useCallback } from "react";
import styles from "./Pagination.module.css";
import { useSelector } from "react-redux";

interface PaginationType {
  setPage: Function;
  currentPageNum: number;
}

type SortByDataType = {
  sortBySearch: {
    data: {
      page: number;
      total_pages: number;
      total_results: number;
    };
  };
};

const Pagination = ({ setPage, currentPageNum }: PaginationType) => {
  const sortByDataInfo = useSelector<SortByDataType>((state) => {
    return state.sortBySearch.data;
  }) as any;

  const [totalPages, setTotalPages] = useState(sortByDataInfo.total_pages);
  const [renderPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(
    Math.ceil(currentPageNum / renderPage)
  );
  const [lastPage, setLastPage] = useState(pageGroup * renderPage);
  const [firstPage, setFirstPage] = useState(lastPage - (renderPage - 1));
  const [renderPageNum, setRenderPageNum] = useState<number[]>([0]);

  // 페이지네이션 그리는 함수
  const paginationFunc = useCallback(() => {
    const pageNumberList = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pageNumberList.push(i);
    }
    setRenderPageNum(pageNumberList);
  }, [firstPage, lastPage]);
  useEffect(() => {
    paginationFunc();
  }, [paginationFunc]);

  const pageChangeFunc = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <article className={styles.pagination}>
      <nav className={styles.pagination_nav}>
        <button className={styles.prev_btn}>◀</button>
        <ul className={styles.pagination_ul}>
          {renderPageNum.map((pageNum: number, i: number) => {
            return (
              <li
                onClick={() => {
                  pageChangeFunc(pageNum);
                }}
                key={Math.random() * 10000 * i}
              >
                {pageNum}
              </li>
            );
          })}
        </ul>
        <button className={styles.next_btn}>▶</button>
      </nav>
    </article>
  );
};

export default Pagination;
