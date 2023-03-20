import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FooterUpload from "./footerUpload";
function UploadBox({
  userId,
  userRep,
  username,
  Rep,
  replayId,
  repBody,
  socket,
  show,
  setShow,
  IMG,
}) {
  const handleClose = () => setShow(false);

  return (
    <div className="uploadBox">
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={IMG}
            style={{
              width: "auto",
              hight: "auto",
              objectFit: "fill",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <FooterUpload
            userId={userId}
            userRep={userRep}
            username={username}
            Rep={Rep}
            replayId={replayId}
            repBody={repBody}
            socket={socket}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadBox;
