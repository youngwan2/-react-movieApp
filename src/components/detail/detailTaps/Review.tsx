import React from "react";
import styles from "./Review.module.css";
import NotFind from "./NotFind";

// 각 컴포넌트 타입 지정
interface ReviewsInfoType {
  author: string;
  created_at: string;
  content: string;
}
interface reviewType {
  apiData: {
    id: number;
    page: number;
    results: ReviewsInfoType[];
  };
}

// Review
const Review = ({ apiData }: reviewType) => {
  return (
    <section className={styles.review}>
      {apiData.results && apiData.results[0] !== undefined ? (
        apiData.results.map((result,i) => {
          const { author, content, created_at} = result;
          return (
            <ReviewsInfo
              author={author}
              content={content}
              created_at={created_at}
              key={i}
            
            />
          );
        })
      ) : (
        <NotFind />
      )}
    </section>
  );
};

// ReviewsInfo
const ReviewsInfo = ({ author, created_at, content }: ReviewsInfoType) => {
  return (
    <section className={styles.review_info}>
      <div className={styles.review_author}>
        {author && <p className={styles.author}>{author}</p>}
        <p className={styles.created_date}>{created_at}</p>
      </div>
      <div className={styles.review_content_con}>
        <p className={styles.content}>{content}</p>
      </div>
    </section>
  );
};

export default Review;
