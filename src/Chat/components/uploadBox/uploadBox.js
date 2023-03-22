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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {/* {(getExtension(IMG).toLowerCase() === "png" || 
          getExtension(IMG).toLowerCase() === "jpg") ? (
            <img src={IMG} />
          ):
          undefined
      }
      { getExtension(IMG).toLowerCase() === "mp3" ||
        getExtension(IMG).toLowerCase() === "mp4" ||
        getExtension(IMG).toLowerCase() === "wav" ?(
          <AudioPlayer
            autoPlay
            src={IMG}
            onPlay={e => console.log("onPlay")}
          />
          ) :
          undefined
      }
      { getExtension(IMG).toLowerCase() === "pdf" ||
        getExtension(IMG).toLowerCase() === "docx" ||
        getExtension(IMG).toLowerCase() === "ppt" ? (
          <button onClick={() => download(IMG)} className='download-btn'>
              Download
          </button>
          ) :
          undefined
          } */}

          <img src={IMG} />
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
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadBox;
