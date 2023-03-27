import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import UpdateBookingForm from "./index";

function UpdateBookingModal(bookingId) {
  const [showModal, setShowModal] = useState(false);
  const [sendBookingId, setSendBookingId] = useState("");
  console.log("does the bookingId come through", bookingId);

  return (
    <>
      <button
        className="whiteButton"
        onClick={() => (setShowModal(true), setSendBookingId(bookingId))}
      >
        <i className="material-symbols-outlined">edit_note</i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBookingForm
            showModal={showModal}
            setShowModal={setShowModal}
            sendBookingId={sendBookingId}
          />
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingModal;
