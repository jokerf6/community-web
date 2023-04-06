import React, { useState, useEffect } from "react";
import "../Participants/Participants.css";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import load from "../../Chat/images/load.gif";
import {
  ACCEPTAll_LINK,
  ACCEPT_REMOVE_USER_LINK,
  ALLPENDING_USER_LINK,
  REMOVEAll_LINK,
} from "../../constants";

export default function Pending() {
  const [inputText, setInputText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setloading] = useState(false);

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    setloading(true);
    await fetch(ALLPENDING_USER_LINK, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setloading(false);
  }
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(lowerCase);
  };

  const filteredData = allUsers.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.number.toLowerCase().includes(inputText);
    }
  });
  async function accept(id) {
    await fetch(ACCEPT_REMOVE_USER_LINK + "/" + id + "/accept", {
      method: "PATCH",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }
  async function remove(id) {
    await fetch(ACCEPT_REMOVE_USER_LINK + "/" + id + "/remove", {
      method: "DELETE",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }
  async function acceptAll() {
    await fetch(ACCEPTAll_LINK, {
      method: "PATCH",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }
  async function removeAll() {
    await fetch(REMOVEAll_LINK, {
      method: "DELETE",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={load} alt="loading" />
        </div>
      ) : (
        <div className="participant">
          <div className="search-bar">
            <div
              className="search-input"
              style={{
                width: "75%",
              }}
            >
              <BiSearch className="search-img" />
              <input
                placeholder="Search for any user"
                onChange={inputHandler}
              />
            </div>
            <div
              className="btn-div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                className="search-btn"
                onClick={() => {
                  setAllUsers([]);
                  acceptAll();
                }}
                style={{
                  opacity: allUsers.length === 0 ? "50%" : "100%",
                }}
                disabled={allUsers.length === 0 ? true : false}
              >
                Accept all
              </button>
              <button
                className="search-btn"
                style={{
                  backgroundColor: "white",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "5px",
                  opacity: allUsers.length === 0 ? "50%" : "100%",
                }}
                disabled={allUsers.length === 0 ? true : false}
                onClick={() => {
                  setAllUsers([]);
                  removeAll();
                }}
              >
                Remove all
              </button>
            </div>
          </div>
          {allUsers.length > 0 ? (
            <div className="users">
              {filteredData.map((user) => (
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col
                    lg={8}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "85px",
                    }}
                  >
                    <FaUser className="user-avatar" />
                    <h5 className="number">{user.number}</h5>
                  </Col>
                  <Col lg={2}>
                    <button
                      className="extend"
                      onClick={async () => {
                        const id = user.id;
                        const result = allUsers.filter(
                          (user) => user.id !== id
                        );
                        setAllUsers(result);
                        await accept(id);
                      }}
                    >
                      Accept
                    </button>
                  </Col>
                  <Col lg={2}>
                    <button
                      className="end-session"
                      onClick={async () => {
                        const id = user.id;

                        const result = allUsers.filter(
                          (user) => user.id !== id
                        );
                        setAllUsers(result);
                        await remove(id);
                      }}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              ))}
            </div>
          ) : (
            <p className="noData">There are no people in the waiting list</p>
          )}
        </div>
      )}
    </>
  );
}
