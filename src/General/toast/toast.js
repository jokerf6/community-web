import React from "react";
import Toast from "react-bootstrap/Toast";

function CustemizeToast(show, setShow, Title) {
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Sorry</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body>{Title}</Toast.Body>
    </Toast>
  );
}

export default CustemizeToast;
