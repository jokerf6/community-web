import React from "react";
import "../../Chat.css";
export default function OfflineMessage({ messageList, username }) {
  return (
    <div className="message-container">
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
                  hi
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
    </div>
  );
}
