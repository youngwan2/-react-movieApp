import React from "react";
import styles from "./Review.module.css";

interface reviewType {
  apiData: any;
}
const Review: React.FC<reviewType> = ({ apiData }) => {
  return (
    <div className={styles.review}>
      {apiData.results !== undefined ? (
        apiData.results.map((_: any, i: number) => {
          return (
            <div className={styles.review_info} key={i}>
              <div className={styles.review_author}>
                <div className={styles.author}>
                  {apiData.results[i].author !== undefined
                    ? apiData.results[i].author
                    : null}
                </div>
                <div className={styles.created_date}>
                  {apiData.results[i].created_at}
                </div>
              </div>
              <div className={styles.review_content}>
                <div className={styles.content}>
                  {apiData.results[i].content}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>리뷰가 없음</div>
      )}
    </div>
  );
};

export default Review;
