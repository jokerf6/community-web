import React from "react";
import Styles from "./Image.module.css";
import Img from "../images/74908-girl-chatting-with-online-friends.gif";
export default function Image() {
  return <img src={Img} className={Styles.image} alt="" />;
}
