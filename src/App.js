import React, { useState, useEffect } from "react";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(
    () => {
      fetchReviews().then((arr) =>{
        setReviews(arr);
      });
    },
    []
  );

  return (
    <div>
      <h1>Book Reviews</h1>
      <Reviews reviews={reviews} />
    </div>
  );
}

function Reviews({ reviews }) {
  return (
    <dl>
      {reviews.map(review => {
        return <Review {...review} />;
      })}
    </dl>
  );
}

function Review({ title, reviewer, body, score }) {
  return (
    <>
      <dt>Title</dt>
      <dd>{title}</dd>
      <dt>Reviewed by</dt>
      <dd>{reviewer}</dd>
      <dt>Body</dt>
      <dd>{body}</dd>
      <dt>Score</dt>
      <dd>{score}</dd>
    </>
  );
}

async function fetchReviews() {
  const res = await fetch('https://bookreview-ten.vercel.app/api/reviews', { headers: { 'Content-Type': 'application/json' } })
  return await res.json()
}

export default App;
