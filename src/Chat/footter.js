import React, { useState } from "react";
import img1 from "./right-arrow (1) 1.png";
import img2 from "./smiling-face 1.png";
import img3 from "./upload 1.png";
import exit from "./exit.png";
import Picker from "emoji-picker-react";

import "./Chat.css";
import checkPageStatus from "../utils/functions";
import OnlineMessage from "./components/message/onlineMessage";
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
}) {
  const userId = localStorage.getItem("userId");
  const [Input, setInput] = useState(null);
  const [send, setSend] = useState(false);

  function close() {
    setrep(true);
  }
  function openPicker(e) {
    showPicker ? setShowPicker(false) : setShowPicker(true);
  }
  if (chosenEmoji !== "") {
    // setInput(Input + chosenEmoji);
    document.getElementById("inp").value += chosenEmoji;
    setChosenEmoji("");
  }


  // const [file, setFlie] = useState();
  const [file, setFile] = useState();
    function handleFile(event) {
        // setFlie(event.target.files[0]);
        console.log(event.target.files[0]);
        setFile(URL.createObjectURL(event.target.files[0]));
    }
    function handleUpload() {
        const formData = new FormData();
        formData.append('file', file)
        fetch(
            'url',
            {
                method: 'POST',
                body: formData
            }.then((respone) => respone.json()).then(
                (result) => {
                    console.log('success', result)
                }
            ).catch(error => {
                console.error('error:', error)
            })
        )
    }

  return (
    <div className="fotterBox" id="fotterBox">
      <div className={!Rep ? "chat-footer3 chat-body2" : "chat-footer2 chat-body"}>
        <div className="chat-footer-child">
          <div className="boxLine">
            <hr
              className="line"
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
        <button onClick={openPicker} type="button">
          {!showPicker ? (
            <img src={exit} alt="" className="images" />
          ) : (
            <img src={img2} alt="" className="images" />
          )}
        </button>

        <form onSubmit={handleUpload} className = 'upload'>
            <label htmlFor="filePicker">
            <img src={img3} alt="" style={{ width: '70%' }}/>
            </label>
          <input type="file" id="filePicker" onChange={handleFile} style={{ padding: '0%', visibility: "hidden", width: '0%' }}/>
        </form>
        {/* <img src={file}/> */}
        <input
          type="text"
          required="required"
          name="message"
          placeholder="Type your message"
          id="inp"
        />

        <input
          type="submit"
          hidden
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button type="submit">
          <img src={img1} alt="" className="images" />
        </button>
      </form>
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
      /*  divRef.current.scroll({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });*/
      //setMessageList((list) => [...list, messageData]);
    }
  }
}
