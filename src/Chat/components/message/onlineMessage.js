import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../Chat.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import checkPageStatus from "../../../utils/functions";
import DOWN from "../../down1.png";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import DownloadLink from "react-download-link";
import useDownloader from "react-use-downloader";
import { BsDownload } from "react-icons/bs";

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
}) {
  const userId = localStorage.getItem("userId");
  const [firstUnreadMessage, setFirstUnreadMessage] = useState("");
  const [drop, setDrop] = useState("");
  const [Unread, setUnread] = useState(0);

  const [valid, setValid] = useState("");
  const [open, setOpen] = React.useState(false);

  function handleOpen(e) {
    console.log(e.target.id.split(".")[1]);

    console.log(
      document.getElementById("menu.3fd9cb97-0090-4dd5-a498-50169ee439ed")
    );
    if (drop !== "" && drop !== e.target.id.split(".")[1]) {
      document.getElementById("menu." + drop).hidden = true;
    }
    document.getElementById("menu." + e.target.id.split(".")[1]).hidden =
      !document.getElementById("menu." + e.target.id.split(".")[1]).hidden;
    setOpen(!open);
    setDrop(e.target.id.split(".")[1]);
  }
  useEffect(() => {
    socket.on("unreadRes", (data) => {
      if (data["resId"] === userId && data["unReadNumber"] > 0) {
        setUnread(data["unReadNumber"]);
        checkPageStatus(data, localStorage.getItem("userName"));
      }
      if (data["resId"] === userId && data["unReadNumber"] === 1) {
        setFirstUnreadMessage(data["unReadNumberId"]);
        setUnread(data["unReadNumber"]);
      } else if (data["resId"] === userId && data["unReadNumber"] === 0) {
        setFirstUnreadMessage("");
        setUnread(0);
      }
    });
  }, [socket]);
  function show(e) {
    setValid(e.target.id.split(".")[1]);
  }
  function hide() {
    setValid("");
  }
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
      console.log("ssdsdsdsds");
      console.log(e.target.id.split(".")[1]);
      setReplayId(e.target.id);
      const x =
        document.getElementById("list." + e.target.id).childNodes > 1
          ? document.getElementById("auth." + e.target.id).innerHTML
          : "You";
      console.log(x);
      setuserRep(x);
      console.log(document.getElementById("body." + e.target.id).innerHTML);

      setrepBody(document.getElementById("body." + e.target.id).innerHTML);
      setrep(false);
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
    <div className={!Rep ? "chat-body chat-window2" : "chat-body"}>
      <ScrollToBottom
        className="message-container"
        scrollViewClassName="class-scroll"
      >
        {messageList.map((messageContent) => {
          return (
            <div>
              {firstUnreadMessage === messageContent.messageId ? (
                <div className="new">
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
                    <AudioPlayer
                      autoPlay
                      src={messageContent.message}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      layout="horizontal-reverse"
                    />
                  ) : messageContent["mediaUrl"] &&
                    (getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                      "mp3" ||
                      getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                        "mp4" ||
                      getExtension(messageContent["mediaUrl"]).toLowerCase() ===
                        "wav") ? (
                    <AudioPlayer
                      autoPlay
                      src={messageContent["mediaUrl"]}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      layout="horizontal-reverse"
                    />
                  ) : (
                    <div
                      onMouseEnter={show}
                      onMouseLeave={hide}
                      className="message-content"
                      id={"messageBox." + messageContent.messageId}
                    >
                      {messageContent.replay ? (
                        <div className="replayMess">
                          <p>{messageContent.repBody}</p>
                        </div>
                      ) : undefined}

                      <div className="handel">
                        <p id={"list." + messageContent.messageId}>
                          {username !== messageContent.author ? (
                            <span
                              className="auth"
                              id={"auth." + messageContent.messageId}
                            >
                              {messageContent.author}
                            </span>
                          ) : undefined}

                          {username !== messageContent.author ? (
                            <br />
                          ) : undefined}

                          {messageContent.type === "MEDIA" ? (
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
                                  <img src={messageContent["mediaUrl"]} />
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
                            {messageContent.message}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
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
                    <li className="menu-item">
                      <button>Delete</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
}
