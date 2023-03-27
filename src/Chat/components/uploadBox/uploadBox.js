import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FooterUpload from "./footerUpload";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import useDownloader from "react-use-downloader";

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
  notUploadedFile,
  numberOfMessages,
  setNumerOfMessages,
}) {
  const handleClose = () => setShow(false);

  function getExtension(filename) {
    return filename.split(".").pop();
  }
  const { download } = useDownloader();
  return (
    <div className="uploadBox">
      <Modal
        show={show}
        onHide={handleClose}
        className="up"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {notUploadedFile &&
          (getExtension(notUploadedFile.name).toLowerCase() === "png" ||
            getExtension(notUploadedFile.name).toLowerCase() === "svg" ||
            getExtension(notUploadedFile.name).toLowerCase() === "gif" ||
            getExtension(notUploadedFile.name).toLowerCase() === "jpg") ? (
            <img src={IMG} />
          ) : undefined}
          {notUploadedFile &&
          (getExtension(notUploadedFile.name).toLowerCase() === "mp3" ||
            getExtension(notUploadedFile.name).toLowerCase() === "wav") ? (
            <AudioPlayer
              autoPlay
              src={IMG}
              showJumpControls={false}
              customAdditionalControls={[]}
              customVolumeControls={[]}
              layout="horizontal-reverse"
            />
          ) : undefined}
          {notUploadedFile &&
          getExtension(notUploadedFile.name).toLowerCase() === "mp4" ? (
            <video autoPlay src={IMG} controls />
          ) : undefined}
          {notUploadedFile &&
          (getExtension(notUploadedFile.name).toLowerCase() === "pdf" ||
            getExtension(notUploadedFile.name).toLowerCase() === "docx" ||
            getExtension(notUploadedFile.name).toLowerCase() === "ppt") ? (
            <button onClick={() => download(IMG)} className="download-btn">
              Download
            </button>
          ) : undefined}
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
            notUploadedFile={notUploadedFile}
            setShow={setShow}
            numberOfMessages={numberOfMessages}
            setNumerOfMessages={setNumerOfMessages}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadBox;
