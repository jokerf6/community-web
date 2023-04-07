import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import img4 from "./images/logout 1.png";
import img5 from "./images/settings 1.png";
import { useNavigate } from "react-router-dom";
import OnlineMessage from "./components/message/onlineMessage";
import Fotter from "./footter";
import Picker from "emoji-picker-react";
import Notification from "./components/message/toast";
import { CHAT_LINK, LOGOUT_LINK } from "../constants";
import LOAD from "./images/load.gif";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket }) {
  // const divRef = useRef();
  const username = localStorage.getItem("number");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const [messageList, setMessageList] = useState([]);
  const [rep, setrep] = useState(true);
  const [userRep, setuserRep] = useState("");
  const [repBody, setrepBody] = useState("");
  const [replayId, setReplayId] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(true);
  const [repType, setRepType] = useState("");
  const [load, setLoad] = useState(false);
  const [Unread, setUnread] = useState(0);
  const [firstUnreadMessage, setFirstUnreadMessage] = useState("");
  const [numerOfMessages, setNumerOfMessages] = useState(0);
  const [top, setTop] = React.useState(0);
  const [lock, setLock] = React.useState(false);

  // Use the scrollToPercent function to scroll to 50% of the scrollable area
  const navigate = useNavigate();
  const handleGoToSetting = () => {
    navigate("/settings");
  };
  useEffect(() => {
    if (messageList.length === 0) {
      setLoad(true);
      getAllMessages();
    }

    socket.on("receive_message", async (data) => {
      setMessageList((list) => [...list, data]);
      data["resId"] = userId;
      socket.emit("unreadReq", data);
    });

    document.addEventListener("visibilitychange", async function (event) {
      if (document.hidden) {
        socket.emit("logout", userId);
        new Notification("New message from Open Chat");
      } else {
        socket.emit("join", userId);
      }
    });
  }, [socket]);

  const onEmojiClick = (event) => {
    setChosenEmoji(event.emoji);
  };

  return (
    <>
      {!load ? (
        <div className="chat-window">
          <div className="chat-header">
            {role === "ADMIN" ? (
              <button onClick={handleGoToSetting}>
                <img src={img5} alt="" className="logout" />
              </button>
            ) : undefined}

            <button onClick={logout}>
              <img src={img4} alt="" className="logout" />
            </button>
          </div>
          <div className={!rep ? "chat-body chat-window2" : "chat-body"}>
            {Unread > 0 ? (
              <div
                mode="bottom"
                id="scroll"
                className="message-container"
                // scrollViewClassName="class-scroll"
                // onScroll={scroll}
              >
                <OnlineMessage
                  messageList={messageList}
                  username={username}
                  socket={socket}
                  setrep={setrep}
                  setuserRep={setuserRep}
                  setrepBody={setrepBody}
                  setReplayId={setReplayId}
                  setRepType={setRepType}
                  Rep={rep}
                  role={role}
                  setFirstUnreadMessage={setFirstUnreadMessage}
                  setUnread={setUnread}
                  firstUnreadMessage={firstUnreadMessage}
                  Unread={Unread}
                  numerOfMessages={numerOfMessages}
                  setMessageList={setMessageList}
                  setNumerOfMessages={setNumerOfMessages}
                  top={top}
                  setTop={setTop}
                />
              </div>
            ) : (
              <ScrollToBottom
                mode="bottom"
                id="scroll"
                className="message-container"

                // scrollViewClassName="class-scroll"
                // onScroll={scroll}
              >
                <OnlineMessage
                  messageList={messageList}
                  username={username}
                  socket={socket}
                  setrep={setrep}
                  setuserRep={setuserRep}
                  setrepBody={setrepBody}
                  setReplayId={setReplayId}
                  setRepType={setRepType}
                  Rep={rep}
                  role={role}
                  setFirstUnreadMessage={setFirstUnreadMessage}
                  setUnread={setUnread}
                  firstUnreadMessage={firstUnreadMessage}
                  Unread={Unread}
                  numerOfMessages={numerOfMessages}
                  setMessageList={setMessageList}
                  setNumerOfMessages={setNumerOfMessages}
                  top={top}
                  setTop={setTop}
                />
              </ScrollToBottom>
            )}
          </div>
          <div className="emo" hidden={showPicker}>
            <Picker
              onEmojiClick={onEmojiClick}
              width={700}
              height={400}
              disableAutoFocus={true}
              native
            />
          </div>
          <Fotter
            socket={socket}
            username={username}
            Rep={rep}
            userRep={userRep}
            repBody={repBody}
            setrep={setrep}
            replayId={replayId}
            setShowPicker={setShowPicker}
            showPicker={showPicker}
            chosenEmoji={chosenEmoji}
            setChosenEmoji={setChosenEmoji}
            repType={repType}
            role={role}
            numberOfMessages={numerOfMessages}
            setNumerOfMessages={setNumerOfMessages}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={LOAD} alt="loading" />
        </div>
      )}
    </>
  );

  async function getAllMessages() {
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
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
          if (
            json.data["numberOfMessages"] > 0 &&
            json.data["AllMessage"][0].unReadNumber > 0
          ) {
            setUnread(json.data["AllMessage"][0].unReadNumber);
            setFirstUnreadMessage(json.data["AllMessage"][0].unReadNumberId);
          }
          console.log(json.data["AllMessage"]);
          setMessageList((list) => [...json.data["AllMessage"], ...list]);
          setNumerOfMessages(json.data["numberOfMessages"]);
          setLoad(false);

          setLock(false);
        }
      });
  }
  function logout() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
    });

    fetch(LOGOUT_LINK, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.clear();

        navigate("/login");
      });
  }
}

export default Chat;
