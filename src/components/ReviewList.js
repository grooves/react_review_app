import React from "react";
import { Review } from "./Review";

function ReviewList({ reviews, removeReview, openEditModal }) {
  return (
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>title</th>
          <th>score</th>
          <th>body</th>
          <th>reviewer</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review, index) => {
          const id = review.id ?? index;
          return (
            <Review
              key={id}
              index={index}
              removeReview={removeReview}
              openEditModal={openEditModal}
              {...{ ...review, id }}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default ReviewList;
