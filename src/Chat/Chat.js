import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import img4 from "./logout 1.png";
import img5 from "./settings 1.png";
import { useNavigate } from "react-router-dom";
import OnlineMessage from "./components/message/onlineMessage";
import Fotter from "./footter";
import Picker from "emoji-picker-react";
import Notification from "./components/message/toast";

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

  const navigate = useNavigate();
  const handleGoToSetting = () => {
    navigate("/settings");
  };
  useEffect(() => {
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

  const onEmojiClick = (event, emojiObject) => {
    console.log(event.emoji);
    setChosenEmoji(event.emoji);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button onClick={handleGoToSetting}>
          <img src={img5} alt="" className="logout" />
        </button>
        <button>
          <img src={img4} alt="" className="logout" />
        </button>
      </div>
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
      />
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
      />
    </div>
  );
}

export default Chat;
