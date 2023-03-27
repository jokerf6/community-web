import React, { useState } from "react";
import img1 from "./right-arrow (1) 1.png";
import img2 from "./smiling-face 1.png";
import img3 from "./upload 1.png";
import exit from "./exit.png";
import axios from "axios";
import MIC from "./mic.png";
import CAMERA from "./CAMERA.png";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "./Chat.css";
import SEND from "./send.png";
import REMOVE from "./remove.png";
import UploadBox from "./components/uploadBox/uploadBox";
export default function Fotter({
  socket,
  username,
  Rep,
  userRep,
  repBody,
  setrep,
  replayId,
  setShowPicker,
  showPicker,
  chosenEmoji,
  setChosenEmoji,
  repType,
  role,
  numberOfMessages,
  setNumerOfMessages,
}) {
  const [input, setInput] = useState("");
  const [mic, setMic] = useState(false);
  const [show, setShow] = useState(false);

  const [Url, setUrl] = useState("");
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    console.log(recorderControls.target);
    const url = URL.createObjectURL(blob);
    setUrl(url);
  };
  const userId = localStorage.getItem("userId");
  function close() {
    setrep(true);
    repType = "";
  }

  function handelChange(e) {
    setInput(e.target.value);
  }
  function openPicker(e) {
    showPicker ? setShowPicker(false) : setShowPicker(true);
  }
  if (chosenEmoji !== "") {
    // setInput(Input + chosenEmoji);
    document.getElementById("inp").value += chosenEmoji;
    setChosenEmoji("");
  }
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();

  function handleFile(event) {
    // setFlie(event.target.files[0]);
    //   console.log(event.target.files[0]);
    setFile2(event.target.files[0]);
    setShow(true);
    var reader = new FileReader();

    reader.onload = function (e) {
      setFile(e.target.result);
      // document.getElementById("#blah").attr("src", e.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
    const el = document.getElementById("filePicker");
    el.parentNode.reset();
  }
  function handleUpload(e) {
    const formData = new FormData();
    formData.append("file", file);
    fetch(
      "url",
      {
        method: "POST",
        body: formData,
      }
        .then((respone) => respone.json())
        .then((result) => {
          console.log("success", result);
        })
        .catch((error) => {
          console.error("error:", error);
        })
    );
  }

  return (
    <>
      {role === "ADMIN" ? (
        <div className="fotterBox" id="fotterBox">
          <UploadBox
            userId={userId}
            userRep={userRep}
            username={username}
            Rep={Rep}
            replayId={replayId}
            repBody={repBody}
            socket={socket}
            show={show}
            setShow={setShow}
            IMG={file}
            notUploadedFile={file2}
            numberOfMessages={numberOfMessages}
            setNumerOfMessages={setNumerOfMessages}
          />

          <div className={!Rep ? "chat-footer3" : "chat-footer2"}>
            <div className="chat-footer-child">
              <div className="boxLine">
                <hr
                  className="
      line"
                />
              </div>
              <div className="replayInfo">
                <p className="replayUser">{userRep}</p>

                <p className="replayText">
                  {repType === "VOICE" ? (
                    <img
                      src={MIC}
                      style={{
                        width: "15px",
                      }}
                    />
                  ) : undefined}
                  {repType === "MEDIA" ? (
                    <img
                      src={CAMERA}
                      style={{
                        width: "15px",
                      }}
                    />
                  ) : undefined}
                  {repBody}
                </p>
              </div>
            </div>
            <img src={exit} className="exit" onClick={close} />
          </div>
          <form className="chat-footer" onSubmit={sendMessage} id="for">
            {mic ? undefined : (
              <div className="buttons">
                <button onClick={openPicker} type="button">
                  {!showPicker ? (
                    <img src={exit} alt="" className="ico" />
                  ) : (
                    <img src={img2} alt="" className="ico" />
                  )}
                </button>
                <form onSubmit={handleUpload} className="uploadIcon">
                  <label
                    htmlFor="filePicker"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img src={img3} alt="" style={{ width: "28px" }} />
                  </label>
                  <input
                    type="file"
                    id="filePicker"
                    style={{ visibility: "hidden" }}
                    onChange={handleFile}
                  />
                </form>
              </div>
            )}

            {mic ? (
              <div className="audioReco">
                <audio src={Url} controls />
                <div
                  className="removeBOx"
                  onClick={() => {
                    setMic(false);
                  }}
                >
                  <img src={REMOVE} alt="" className="remove" />
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  required="required"
                  name="message"
                  placeholder="Type your message"
                  id="inp"
                  onChange={handelChange}
                />

                <input
                  type="submit"
                  hidden
                  onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                  }}
                />
              </div>
            )}
            {input === "" && !mic ? (
              <div
                className="rec"
                onClick={() => {
                  setUrl("");
                }}
              >
                <AudioRecorder
                  onRecordingComplete={(blob) => {
                    if (!mic && Url === "") {
                      addAudioElement(blob);
                      setMic(true);
                    }
                  }}
                  recorderControls={recorderControls}
                  classes={{
                    AudioRecorderStartSaveClass: "audio-recorder-svg-color",
                    AudioRecorderPauseResumeClass: "audio-recorder-svg-color",
                    AudioRecorderDiscardClass: "audio-recorder-svg-color",
                    AudioRecorderClass: "audioRecord",
                  }}
                />
              </div>
            ) : (
              <div className="removeBOx">
                {mic ? (
                  <button
                    type="button"
                    onClick={() => {
                      console.log("dsdsdsdsdsdsdsdsdsd");
                      //    setMic2(false);
                      setMic(false);
                      upload(Url);
                    }}
                  >
                    <img src={SEND} alt="" className="sendIcon" />
                  </button>
                ) : (
                  <button type="submit">
                    <img src={SEND} alt="" className="sendIcon" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#7cc1f9",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "white",
              padding: "15px 0",
              margin: "0",
              fontWeight: "bold",
            }}
          >
            Only admins can send messages
          </p>
        </div>
      )}
    </>
  );

  async function sendMessage(e) {
    console.log("yessssssssssssssss");

    e.preventDefault();
    const currentMessage = e.target.message.value;

    e.target.message.value = null;

    if (currentMessage !== "") {
      const messageData = {
        id: userId,
        author: username,
        message: currentMessage,
        type: "TEXT",
        repType: repType,
        mediaUrl: null,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        resId: userId,
        replay: !Rep ? true : false,
        replayId: replayId,
        userRep: userRep,
        repBody: repBody,
      };

      await socket.emit("send_message", messageData);

      setrep(true);
      setShowPicker(true);
      setInput("");
      setNumerOfMessages(numberOfMessages + 1);
      /*  divRef.current.scroll({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });*/
      //setMessageList((list) => [...list, messageData]);
    }
  }
  async function upload(mediaBlob) {
    setMic(false);
    console.log("+++++++++++++++++++++++");
    console.log(mic);
    console.log(mediaBlob);
    const audioBlob = await fetch(mediaBlob).then((r) => r.blob());
    console.log(audioBlob);

    const audiofile = new File([audioBlob], "audiofile.wav", {
      type: "audio/wav",
    });

    console.log(audiofile);

    const formData = new FormData();

    formData.append("file", audiofile);

    const result = await axios.post(
      `http://127.0.0.1:4001/upload/file`,
      formData,
      {
        crossDomain: true,
      }
    );
    console.log(result["data"]);
    console.log("yessssssssssssssss");

    const currentMessage = result["data"]["url"];

    if (currentMessage !== "") {
      const messageData = {
        id: userId,
        author: username,
        message: currentMessage,
        type: "VOICE",
        mediaUrl: null,
        repType: repType,

        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        resId: userId,
        replay: !Rep ? true : false,
        replayId: replayId,
        userRep: userRep,
        repBody: repBody,
      };
      setMic(false);

      setrep(true);
      await socket.emit("send_message", messageData);
      setNumerOfMessages(numberOfMessages + 1);

      console.log("==========================================================");
    }
    //  async function sendMessage() {

    /*  divRef.current.scroll({
       top: divRef.current.scrollHeight,
       behavior: "smooth",
     });*/
    //setMessageList((list) => [...list, messageData]);
    //   }
  }
}
