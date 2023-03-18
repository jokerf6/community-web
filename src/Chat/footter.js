import React, { useState } from "react";
import img1 from "./right-arrow (1) 1.png";
import img2 from "./smiling-face 1.png";
import img3 from "./upload 1.png";
import exit from "./exit.png";
import mic from "./mic.png";
import "./Chat.css";
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
  const userId = localStorage.getItem("userId");

  function close() {
    setrep(true);
  }
  const [input, setInput] = useState("");
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
            <button type="submit">
              <img src={input !== "" ? img1 : mic} alt="" className="images" />
            </button>
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
      setInput(null);
      /*  divRef.current.scroll({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });*/
      //setMessageList((list) => [...list, messageData]);
    }
  }
}
