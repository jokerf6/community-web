import React, { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../Chat.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import checkPageStatus from "../../../utils/functions";
import DOWN from "../../down1.png";
import CAMERA from "../../CAMERA.png";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MIC from "./mic.png";
import useDownloader from "react-use-downloader";
import { BsDownload } from "react-icons/bs";
import { CHAT_LINK } from "../../../constants";
import { useNavigate } from "react-router-dom";
import IMG from "../../logo.png";
export default function OnlineMessage({
  messageList,
  username,
  newmessageList,
  socket,
  setrep,
  setuserRep,
  setrepBody,
  setReplayId,
  setRepType,
  Rep,
  role,
  setFirstUnreadMessage,
  setUnread,
  firstUnreadMessage,
  Unread,
  numerOfMessages,
  setMessageList,
  setNumerOfMessages,
  top = { top },
  setTop = { setTop },
}) {
  const elementRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const [drop, setDrop] = useState("");

  const [valid, setValid] = useState("");
  const [open, setOpen] = React.useState(false);
  const [load, setLoad] = React.useState(0);
  const [deleted, setDeleted] = React.useState([]);

  const navigate = useNavigate();

  function handleOpen(e) {
    if (drop !== "" && drop !== e.target.id.split(".")[1]) {
      document.getElementById("menu." + drop).hidden = true;
    }
    document.getElementById("menu." + e.target.id.split(".")[1]).hidden =
      !document.getElementById("menu." + e.target.id.split(".")[1]).hidden;
    setOpen(!open);
    setDrop(e.target.id.split(".")[1]);
  }
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
    socket.on("message_delete", (data) => {
      setDeleted((list) => [...list, data]);
    });
    socket.on(
      "unreadRes",
      (data) => {
        if (data["resId"] === userId && data["unReadNumber"] > 0) {
          setUnread(data["unReadNumber"]);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          if (!("Notification" in window)) {
            alert("This browser does not support system notifications!");
          } else if (Notification.permission === "granted") {
            const notification = new Notification(
              "New message from Community",
              {
                icon: IMG,
                body: data.body,
              }
            );

            notification.onclick = () =>
              function () {
                window.open("http://localhost:3000/room");
              };
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission((permission) => {
              if (permission === "granted") {
                const notification = new Notification(
                  "New message from Community",
                  {
                    icon: IMG,
                    body: data.body,
                  }
                );
                notification.onclick = () =>
                  function () {
                    window.open("http://localhost:3000/room");
                  };
              }
            });
          }
        }
        if (data["resId"] === userId && data["unReadNumber"] === 1) {
          setFirstUnreadMessage(data["unReadNumberId"]);
          setUnread(data["unReadNumber"]);
        } else if (data["resId"] === userId && data["unReadNumber"] === 0) {
          setFirstUnreadMessage("");
          setUnread(0);
        }
      },
      [socket]
    );
  }, [socket]);
  function show(e) {
    setValid(e.target.id.split(".")[1]);
  }
  function hide() {
    setValid("");
  }

  console.log(document.getElementById("scroll"));

  window.addEventListener("click", function (e) {
    if (
      !e.target.id ||
      (e.target.id.split["."][0] !== "im" &&
        e.target.id.split["."][0] !== "drop" &&
        e.target.id.split["."][0] !== "op")
    ) {
      document.getElementById("menu." + drop).hidden = true;
    }
  });

  function replay(e) {
    if (
      e.target.parentNode.parentNode.parentNode.parentNode.children[0].id ===
      "TEXT"
    ) {
      setReplayId(e.target.id);
      const x =
        document.getElementById("list." + e.target.id).childNodes > 1
          ? document.getElementById("auth." + e.target.id).innerHTML
          : "You";
      setuserRep(x);

      setrepBody(document.getElementById("body." + e.target.id).innerHTML);
      setrep(false);
      setRepType("TEXT");
    } else {
      setReplayId(e.target.id);
      setuserRep(
        e.target.parentNode.parentNode.parentNode.parentNode.children[0].id
      );
      setrepBody("");
      setrep(false);
      setRepType(
        e.target.parentNode.parentNode.parentNode.parentNode.children[0].id
      );
    }
  }
  function getExtension(filename) {
    if (filename) {
      return filename.split(".").pop();
    }
  }
  function SplitFunction(filename) {
    if (filename) {
      return filename.split("uploads/").pop().split("-")[0];
    }
  }

  const { download } = useDownloader();

  return (
    <ScrollToBottom>
      {messageList.map((messageContent) => {
        return (
          <div>
            {firstUnreadMessage === messageContent.messageId ? (
              <div className="new" id="-1" ref={elementRef}>
                <hr />
                <p className="newText">{Unread} new Messages</p>
                <hr />
              </div>
            ) : undefined}
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
              //    onMouseEnter={show}
              //    onMouseLeave={hide}
            >
              <div id={messageContent.type}>
                {messageContent.type === "VOICE" ? (
                  <div className="aud">
                    {role === "USER" ? (
                      <p>{messageContent.author}</p>
                    ) : undefined}
                    <AudioPlayer
                      src={messageContent.message}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      layout="horizontal-reverse"
                    />
                  </div>
                ) : messageContent["mediaUrl"] &&
                  (getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                    "mp3" ||
                    getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                      "wav") ? (
                  <div>
                    {role === "USER" ? (
                      <p>{messageContent.author}</p>
                    ) : undefined}
                    <AudioPlayer
                      src={messageContent["mediaUrl"]}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      layout="horizontal-reverse"
                    />
                  </div>
                ) : messageContent["mediaUrl"] &&
                  getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                    "mp4" ? (
                  <div>
                    {role === "USER" ? (
                      <p>{messageContent.author}</p>
                    ) : undefined}
                    <video src={messageContent["mediaUrl"]} controls />
                  </div>
                ) : (
                  <div
                    onMouseEnter={show}
                    onMouseLeave={hide}
                    className="message-content"
                    id={"messageBox." + messageContent.messageId}
                  >
                    {messageContent.replay ? (
                      <div className="replayMess">
                        {messageContent["repType"] === "TEXT" ? (
                          <p>{messageContent.repBody}</p>
                        ) : (
                          <div className="imBox">
                            <img
                              src={
                                messageContent.repType === "MEDIA"
                                  ? CAMERA
                                  : MIC
                              }
                                  className="im3"
                                  alt = ''
                            />
                            <span>
                              {messageContent.repType === "MEDIA"
                                ? "Media"
                                : "Audio"}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : undefined}

                    <div
                      className="handel"
                      ref={Unread === 0 ? elementRef : undefined}
                    >
                      <p id={"list." + messageContent.messageId}>
                        {username !== messageContent.author &&
                        messageContent.type !== "DELETED" &&
                        !deleted.includes(messageContent.messageId) ? (
                          <span
                            className="auth"
                            id={"auth." + messageContent.messageId}
                          >
                            {messageContent.author}
                          </span>
                        ) : undefined}
                        {username !== messageContent.author &&
                        messageContent.type !== "DELETED" &&
                        !deleted.includes(messageContent.messageId) ? (
                          <br />
                        ) : undefined}
                        {messageContent.type === "MEDIA" &&
                        messageContent.type !== "DELETED" &&
                        !deleted.includes(messageContent.messageId) ? (
                          <div className="">
                            {getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "png" ||
                            getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "jpg" ||
                            getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "jpeg" ? (
                              <div className="img-size">
                                <img src={messageContent["mediaUrl"]} alt =''/>
                              </div>
                            ) : undefined}

                            {getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "pdf" ||
                            getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "docx" ||
                            getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "docx" ||
                            getExtension(
                              messageContent["mediaUrl"]
                            ).toLowerCase() === "pptx" ? (
                              <button
                                onClick={() =>
                                  download(
                                    messageContent["mediaUrl"],
                                    SplitFunction(messageContent["mediaUrl"])
                                  )
                                }
                                className="download-btn"
                              >
                                <BsDownload />
                                {SplitFunction(messageContent["mediaUrl"])}
                              </button>
                            ) : undefined}
                          </div>
                        ) : undefined}
                        <span id={"body." + messageContent.messageId}>
                          {messageContent.type !== "DELETED" &&
                          !deleted.includes(messageContent.messageId)
                            ? messageContent.message
                            : "This message is deleted"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                </div>
              </div>
              {role === "ADMIN" ? (
                <div
                  className="dropdown"
                  id={"drop." + messageContent.messageId}
                  onClick={handleOpen}
                >
                  <button
                    onClick={handleOpen}
                    id={"op." + messageContent.messageId}
                  >
                    <img
                      src={DOWN}
                      onClick={handleOpen}
                      id={"im." + messageContent.messageId}
                      alt=''
                    />
                  </button>
                  <ul
                    className="menu"
                    hidden={true}
                    id={"menu." + messageContent.messageId}
                  >
                    <li className="menu-item" id={messageContent.messageId}>
                      <button
                        onClick={replay}
                        type="button"
                        id={messageContent.messageId}
                      >
                        Replay
                      </button>
                    </li>
                    <li
                      className="menu-item"
                      id={"delete." + messageContent.messageId}
                    >
                      <button
                        onClick={(e) =>
                          socket.emit("delete", messageContent.messageId)
                        }
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              ) : undefined}
            </div>
          </div>
        );
      })}
    </ScrollToBottom>
  );
  async function getAllMessages() {
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    console.log(
      Math.min(numerOfMessages - messageList.length, 15),
      messageList.length
    );
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });

    await fetch(
      CHAT_LINK +
        `?take=${Math.min(numerOfMessages - messageList.length, 15)}&skip=${
          messageList.length
        }`,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.message === "Unauthorized") {
          navigate("/login");
        } else {
          if (json.data[["AllMessage"]][0].unReadNumber > 0) {
            setUnread(json.data["AllMessage"][0].unReadNumber);
            setFirstUnreadMessage(json.data["AllMessage"][0].unReadNumberId);
          }
          console.log(json.data["AllMessage"]);
          setMessageList((list) => [...json.data["AllMessage"], ...list]);
          console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
          console.log(json.data["AllMessage"]);
          setNumerOfMessages(json.data["numberOfMessages"]);
          document.getElementById("scroll").scrollTo(0, 0);
          setLoad(false);
        }
      });
  }
}
