import React, { useState, useEffect } from "react";
import "../../Chat.css";
import img3 from "../../upload 1.png";
import exit from "../../exit.png";
import img2 from "../../smiling-face 1.png";
import SEND from "../../send.png";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";
import Picker from "emoji-picker-react";

function FooterUpload({
  userId,
  userRep,
  username,
  Rep,
  replayId,
  repBody,
  socket,
  notUploadedFile,
  setShow,
  numberOfMessages,
  setNumerOfMessages,
}) {
  const [chosenEmoji2, setChosenEmoji2] = useState("");
  const [showPicker, setShowPicker] = useState(true);
  const [input, setInput] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    console.log(event.emoji);
    setChosenEmoji2(event.emoji);
  };
  function openPicker(e) {
    showPicker ? setShowPicker(false) : setShowPicker(true);
  }
  if (chosenEmoji2 !== "") {
    document.getElementById("inp2").value += chosenEmoji2;
    setChosenEmoji2("");
  }

  const [file, setFile] = useState();

  function handleFile(event) {
    // setFlie(event.target.files[0]);
    console.log(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("#blah").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

  return (
    <form className="chat-footer" onSubmit={sendMessage} id="for">
      <div className="emo" hidden={showPicker}>
        <Picker
          onEmojiClick={onEmojiClick}
          width={450}
          height={350}
          disableAutoFocus={true}
          native
        />
      </div>
      <div className="buttons">
        <button onClick={openPicker} type="button">
          {!showPicker ? (
            <img src={exit} alt="" className="images" />
          ) : (
            <img src={img2} alt="" className="images" />
          )}
        </button>
      </div>

      <div style={{ width: "90%", margin: "0" }}>
        <input
          type="text"
          name="message"
          placeholder="Type your message"
          id="inp2"
        />

        <input
          type="submit"
          hidden
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
      </div>

      <button type="submit">
        <img src={SEND} alt="" className="sendIcon" />
      </button>
    </form>
  );

  async function sendMessage(e) {
    console.log("yessssssssssssssss");

    e.preventDefault();
    setShow(false);
    const formData = new FormData();

    formData.append("file", notUploadedFile);

    const result = await axios.post(
      `http://127.0.0.1:4001/upload/file`,
      formData,
      {
        crossDomain: true,
      }
    );
    console.log(result["data"]);
    console.log("yessssssssssssssss");

    const currentMessage = e.target.message.value;

    const messageData = {
      id: userId,
      author: username,
      message: currentMessage,
      type: "MEDIA",
      mediaUrl: result["data"]["url"],

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
    setNumerOfMessages(numberOfMessages + 1);

    console.log("==========================================================");
    showPicker(true);
  }
  //  async function sendMessage() {

  /*  divRef.current.scroll({
       top: divRef.current.scrollHeight,
       behavior: "smooth",
     });*/
  //setMessageList((list) => [...list, messageData]);
  //   }
}

export default FooterUpload;
