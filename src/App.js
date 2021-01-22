import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.scss";
import { API_URL } from "./settings";
import ReviewList from "./components/ReviewList";
import { ModalWindow } from "./components/ModalWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPencilAlt);

function App() {
  const [modalOpenFlag, setModalOpenFlag] = useState(false);
  const [editableReview, setEditableReview] = useState({});
  const [reviews, setReviews] = useState([]);

  async function getReviewList() {
    const res = await axios.get(API_URL);
    return res.data;
  }
  // useEffectでawait使いたい時
  // ();で実行 async無名即時関数
  useEffect(() => {
    // (async() => {
    //   const list = await getReviewList();
    //   setReviews(list);
    // })();
    // どっちか
    getReviewList().then((list) => setReviews(list));
  }, []);

  function openModal() {
    setModalOpenFlag(true);
  }

  function openNewModal() {
    setEditableReview({});
    openModal();
  }

  function openEditModal(id) {
    setEditableReview(reviews.find(({ id: rId }) => rId === id));
    openModal();
  }

  function closeModal() {
    setModalOpenFlag(false);
  }

  function addList(review) {
    const array = [...reviews];
    array.push(review);
    setReviews(array);
  }

  function updateList(review) {
    const i = reviews.findIndex(({ id }) => id === review.id);
    const array = [...reviews]; // 値渡しと参照渡し
    array.splice(i, 1, review);
    setReviews(array);
    // setReviews((prev) =>
    //   prev.map((item) => (item.id === review.id ? review : item))
    // );
  }

  async function removeReview(id) {
    if (window.confirm("レビューを削除しますか?")) {
      await axios.delete(`${API_URL}/${id}`);
      const removedArr = [...reviews].filter((review) => review.id !== id);
      setReviews(removedArr);
    } else {
      window.alert("キャンセルされました");
    }
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Book Review App</h1>
          <div className="buttons is-right">
            <button
              data-testid="register"
              onClick={openNewModal}
              className="button is-outlined"
            >
              Register
              <FontAwesomeIcon icon="pencil-alt" />
            </button>
          </div>
          <ReviewList
            reviews={reviews}
            openEditModal={openEditModal}
            removeReview={removeReview}
          />
        </div>
      </section>
      {/* https://toge510.com/2020/03/20/movevaluefromchildtoparent/ */}
      {/* 更新関数を渡す？ */}
      <ModalWindow
        modalOpenFlag={modalOpenFlag}
        closeModal={closeModal}
        editableReview={editableReview}
        addList={addList}
        updateList={updateList}
      />
    </>
  );
}

export default App;
