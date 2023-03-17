import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../Chat.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import checkPageStatus from "../../../utils/functions";

export default function OnlineMessage({
  messageList,
  username,
  newmessageList,
  socket,
  setrep,
  setuserRep,
  setrepBody,
  setReplayId,
}) {
  const userId = localStorage.getItem("userId");
  const [firstUnreadMessage, setFirstUnreadMessage] = useState("");

  const [Unread, setUnread] = useState(0);

  const [valid, setValid] = useState("");

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
  function replay(e) {
    setReplayId(e.target.id);
    console.log(e.target.id);
    const x =
      document.getElementById("list." + e.target.id).childNodes > 1
        ? document.getElementById("auth." + e.target.id).innerHTML
        : "You";
    console.log(x);
    setuserRep(x);
    console.log(document.getElementById("body." + e.target.id).innerHTML);

    setrepBody(document.getElementById("body." + e.target.id).innerHTML);
    setrep(false);
  }
  return (
    <div className="chat-body">
      <ScrollToBottom className="message-container">
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
                <div>
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

                        <span id={"body." + messageContent.messageId}>
                          {messageContent.message}
                        </span>
                      </p>

                      <div
                        className="neww"
                        id={"drop." + messageContent.messageId}
                      >
                        {" "}
                        <DropdownButton
                          title=""
                          size="sm"
                          variant="transperancy"
                          align="end"
                          hidden={
                            messageContent.messageId === valid ? false : true
                          }
                        >
                          <Dropdown.Item
                            id={messageContent.messageId}
                            onClick={replay}
                          >
                            Replay
                          </Dropdown.Item>
                          <Dropdown.Item
                            id={messageContent.messageId}
                            href="#/action-3"
                          >
                            Edit
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
}
