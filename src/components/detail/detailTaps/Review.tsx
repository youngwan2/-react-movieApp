import React from "react";
import styles from "./Review.module.css";

interface reviewType {
  apiData: {
    id: number;
    page: number;
    results: [
      {
        author: string;
        content: string;
        create_at: string;
        created_at: string;
      }
    ];
  };
}
const Review = ({ apiData }: reviewType) => {
  return (
    <div className={styles.review}>
      {apiData.results !== undefined
        ? apiData.results.map((_: any, i: number) => {
            return (
              <div
                className={styles.review_info}
                key={Math.random() * 10000 * i}
              >
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
        : null}
    </div>
  );
};

export default Review;
