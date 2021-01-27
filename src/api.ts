import axios from "axios";
import { BasicItemProps } from "./components/Item";

async function fetchReviews() {
  const url = "https://bookreview-ten.vercel.app/api/reviews";
  return await axios.get(url);
}

async function postReview(newReview: BasicItemProps) {
  const url = "https://bookreview-ten.vercel.app/api/reviews";
  return await axios.post(url, newReview);
}

async function putReview(updatedReview: BasicItemProps) {
  const url = `https://bookreview-ten.vercel.app/api/reviews/${updatedReview.id}`;
  return await axios.put(url, updatedReview);
}

export { fetchReviews, postReview, putReview };
