import React, { useState } from "react";
import img1 from "./right-arrow (1) 1.png";
import img2 from "./smiling-face 1.png";
import img3 from "./upload 1.png";
import exit from "./exit.png";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "./Chat.css";
import SEND from "./send.png";
import REMOVE from "./remove.png";

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
  role,
}) {
  const [input, setInput] = useState("");
  const [mic, setMic] = useState(false);
  const [mic2, setMic2] = useState(false);

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
  }

  function handelChange(e) {
    console.log(e.target.value);
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

  return (
    <div>
      {" "}
      {role !== "ADMIN" ? (
        <div className="chat-footer footer2">
          <p>Only admins can send messages</p>
        </div>
      ) : (
        <div className="fotterBox" id="fotterBox">
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

                <p className="replayText">{repBody}</p>
              </div>
            </div>
            <img src={exit} className="exit" onClick={close} />
          </div>

          <form className="chat-footer" onSubmit={sendMessage} id="for">
            {mic ? undefined : (
              <div className="buttons">
                <button onClick={openPicker} type="button">
                  {!showPicker ? (
                    <img src={exit} alt="" className="images" />
                  ) : (
                    <img src={img2} alt="" className="images" />
                  )}
                </button>
                <button>
                  <img src={img3} alt="" className="images" />
                </button>
              </div>
            )}

            {mic ? (
              <div className="audioReco">
                <audio src={Url} controls />
                <div className="removeBOx">
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
      )}
    </div>
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
        type: "text",

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
        type: "audio",

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

      console.log("==========================================================");
      console.log(mic);
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
