import React, { useEffect, useState } from "react";
import "./Chat.css";
import img1 from "./right-arrow (1) 1.png";
import img2 from "./smiling-face 1.png";
import img3 from "./upload 1.png";
import img4 from "./logout 1.png";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username }) {
  console.log("rec");
  const userId = localStorage.getItem("userId");

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessageList((list) => [...list, data]);
        console.log(messageList);
      },
      [socket]
    );
  }, [socket]);
  document.addEventListener("visibilitychange", async function (event) {
    if (document.hidden) {
      socket.emit("disConnent", userId);
    } else {
      socket.emit("Connent", userId);
    }
  });
  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={img4} alt="" className="logout" />
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <br />
                    <p>
                      {username !== messageContent.author ? (
                        <span className="auth">{messageContent.author}</span>
                      ) : undefined}

                      {username !== messageContent.author ? <br /> : undefined}

                      {messageContent.message}
                    </p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <form className="chat-footer" onSubmit={sendMessage} id="for">
        <button>
          <img src={img2} alt="" className="images" />
        </button>
        <button>
          <img src={img3} alt="" className="images" />
        </button>
        <input
          type="text"
          required="required"
          name="message"
          placeholder="Type your message"
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
    e.preventDefault();
    const currentMessage = e.target.message.value;
    e.target.message.value = null;
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      //setMessageList((list) => [...list, messageData]);
    }
  }
}

export default Chat;
