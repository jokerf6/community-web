import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import img4 from "./logout 1.png";
import img5 from "./settings 1.png";
import { useNavigate } from "react-router-dom";
import OnlineMessage from "./components/message/onlineMessage";
import Fotter from "./footter";
import Picker from "emoji-picker-react";
import Notification from "./components/message/toast";
import { CHAT_LINK, LOGOUT_LINK } from "../constants";
import LOAD from "./load.gif";
import { Navigate, Outlet } from "react-router-dom";

function Chat({ socket, username, role }) {
  // const divRef = useRef();
  const userId = localStorage.getItem("userId");

  const [messageList, setMessageList] = useState([]);
  const [newMessageList, setNewMessageList] = useState([]);
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

  const navigate = useNavigate();

  const handleGoToSetting = () => {
    navigate("/settings");
  };
  useEffect(() => {
    console.log("---------------------------------------------");
    if (messageList.length === 0) {
      setLoad(true);

      getAllMessages();
    }

    socket.on("receive_message", async (data) => {
      setMessageList((list) => [...list, data]);
      data["resId"] = userId;
      document
        .getElementById("scroll")
        .scrollTo(0, document.getElementById("scroll").scrollHeight);
      console.log(
        "////////////////////////////////////////////////////////////"
      );
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

  const onEmojiClick = (event, emojiObject) => {
    console.log(event.emoji);
    setChosenEmoji(event.emoji);
  };
  window.addEventListener("beforeunload", async (e) => {
    // *********** perform database operation here
    e.preventDefault();
    await socket.emit("logout", userId);

    // before closing the browser ************** //
    // added the delay otherwise database operation will not work
    // return undefined;
  });

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
            <div
              id="scroll"
              className="message-container"
              scrollViewClassName="class-scroll"
              onScroll={scroll}
            >
              <OnlineMessage
                messageList={messageList}
                username={username}
                newmessageList={newMessageList}
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
  async function scroll(e) {
    const all = e.target.scrollHeight;
    const position = e.target.scrollTop;

    setTop(position);

    if (
      parseInt((position / all) * 100) === 0 &&
      numerOfMessages !== messageList.length &&
      top > position &&
      !lock
    ) {
      console.log("9999999999999999999999999999999999999999999999999999999");
      setLock(true);
      getAllMessages();
      setTop(e.target.scrollHeight);
      //document.getElementById("scroll").id = "d";
    }
  }
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
          document
            .getElementById("scroll")
            .scrollTo(0, document.getElementById("scroll").scrollHeight);

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
