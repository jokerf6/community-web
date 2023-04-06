import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Img from "../../../../General/loading/images/loading.gif";
import sharedStyles from "../../../../General/loading/loading.module.css";
import img from "../../../../Settings/Participants/Modals/add-user 1.png";
import "../../../../Settings/Participants/Modals/Modal.css";
import Get from "../../../../Core/get";
import { SIGNIN_LINK, SIGNUP_LINK } from "../../../../constants";
import Post from "../../../../Core/post";
export default function Add({ modalShow2, setModalShow2 }) {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState("");

  return (
    <Modal
      show={modalShow2}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
      onHide={() => setModalShow2(false)}
    >
      <Modal.Body className="body-modal">
        <img src={img} alt="" style={{ width: "10%" }} />
        <h4>Add New User</h4>
        <p className="paragraph">Add new user to your community</p>
        <input
          style={{
            marginBottom: "5%",
          }}
          type="text"
          placeholder="Type User Number"
          className="input"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <p
          style={{
            marginBottom: "5%",
            color: "red",
          }}
        >
          {Title}
        </p>

        <button
          onClick={async () => {
            setLoading(true);
            //setModalShow2(false);
            const currentDate = new Date();
            const person = {
              number: number,
              extendDate: currentDate,
            };
            let requestJson = JSON.stringify(person);

            await fetch(SIGNUP_LINK, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: requestJson,
            }).then(async (res) => {
              await res.json().then(async (data) => {
                console.log(res);
                if (res.status !== 200) {
                  console.log(data["message"]);
                  setTitle(data["message"]);
                } else {
                  setTitle("");
                  setNumber("");
                  setModalShow2(false);
                }
              });
            });
            setLoading(false);
          }}
          className="choose"
        >
          Send Request
          {loading ? (
            <img alt="loading" src={Img} className={sharedStyles.load} />
          ) : (
            ""
          )}
        </button>
        <button
          onClick={() => {
            setModalShow2(false);

            setTitle("");
            setNumber("");
          }}
          className="cancel"
        >
          Cancel
        </button>
      </Modal.Body>
    </Modal>
  );
}
