import React from "react";
import Modal from "react-modal";
import { ReviewForm } from "./ReviewForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    transform: "translate(-50%, -50%)",
  },
};

export function ModalWindow({
  modalOpenFlag,
  closeModal,
  editableReview,
  addList,
  updateList,
}) {
  // Modal.setAppElement("#root");
  return (
    <div className="modal" data-testid="modal">
      <Modal
        isOpen={modalOpenFlag}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ReviewForm
          closeModal={closeModal}
          editableReview={editableReview}
          addList={addList}
          updateList={updateList}
        />
      </Modal>
    </div>
  );
}

// メモ
// https://www.youtube.com/watch?v=PcrrJ0BOFGw
