import img from "../Chat/logo.png";

function sendNotification(message, user) {
  console.log("gooooooooooooooooooooooooooooooooooooooooooooooooooooo");
  const notification = new Notification("New message from Community", {
    icon: img,
    body: message.body,
  });
  notification.onclick = () =>
    function () {
      window.open("http://localhost:3000/room");
    };
}

export default function checkPageStatus(message, user) {
  if (user === localStorage.getItem("userName")) {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications!");
    } else if (Notification.permission === "granted") {
      sendNotification(message, user);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          sendNotification(message, user);
        }
      });
    }
  }
}
