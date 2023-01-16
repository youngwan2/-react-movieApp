import React from "react";

interface reviewType {
  apiData: any;
}
const Review: React.FC<reviewType> = ({ apiData }) => {
  console.log("review", apiData.results);
  return (
    <div className="review">
      {apiData.results !== undefined ? (
        apiData.results.map((el: any, i: number) => {
          return (
            <div className="review_info" key={i}>
              <div className="review_author">
                <div className="author">
                  {apiData.results[i].author !== undefined
                    ? apiData.results[i].author
                    : null}
                </div>
                <div className="created_date">
                  {apiData.results[i].created_at}
                </div>
              </div>
              <div className="review_content">
                <div className="content">{apiData.results[i].content}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>리뷰가 없음</div>
      )}
    </div>
  );
}

export default Review;
