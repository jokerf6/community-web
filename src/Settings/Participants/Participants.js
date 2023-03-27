import React, { useState, useEffect } from "react";
import "./Participants.css";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoStarSharp, IoStarOutline } from "react-icons/io5";
import Save from "./Modals/Save";
import End from "./Modals/End";
import { Col, Row, Toast } from "react-bootstrap";
import { ALLUSER_LINK, CHANGEROLE_LINK } from "../../constants";
export default function Participants() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [inputText, setInputText] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });

  useEffect(() => {
    getAllUsers();
  }, []);
  function changeRole(id) {
    fetch(CHANGEROLE_LINK + "/" + id + "/changeRole", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  }
  function getAllUsers() {
    fetch(ALLUSER_LINK, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className="participant">
      <div className="search-bar">
        <div className="search-input">
          <BiSearch className="search-img" />
          <input placeholder="Search for any user" onChange={inputHandler} />
        </div>
        <div className="btn-div">
          <button className="search-btn" onClick={() => setModalShow(true)}>
            Add user
          </button>
          <Save
            setAllUsers={setAllUsers}
            show={modalShow}
            setShow={setModalShow}
            allUsers={allUsers}
          />
        </div>
      </div>

      <div className="users">
        {filteredData
          .filter((user) => user.role === "ADMIN")
          .map((user) => (
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col
                lg={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "85px",
                }}
              >
                <FaUser className="user-avatar" />
                <h5 className="number">{user.number}</h5>
                <div className="star-div">
                  <IoStarSharp
                    className="full-star"
                    onClick={() => {
                      const data = filteredData;
                      const index = data.indexOf(user);
                      data[index]["role"] = "USER";

                      setAllUsers(data);
                      changeRole(user.id);
                    }}
                  />
                </div>
              </Col>
              <Col lg={2}>
                <button
                  className="end-session"
                  onClick={() => {
                    setModalShow2(true);
                    setId(user.id);
                    setNumber(user.number);
                  }}
                >
                  End session
                </button>
                <End
                  number={number}
                  id={id}
                  show={modalShow2}
                  onHide={() => setModalShow2(false)}
                />
              </Col>
            </Row>
          ))}
        {filteredData
          .filter((user) => user.role === "USER" && user.active === true)
          .map((user) => (
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
                <div className="number-content">
                  <h5 className="number">{user.number}</h5>
                  <p className="no-mergin">
                    <span className="date">from {user.createdAt}</span>
                    <span className="date">to {user.extend}</span>
                  </p>
                </div>
                <div className="star-div">
                  <IoStarOutline
                    className="full-star"
                    onClick={() => {
                      const data = filteredData;
                      const index = data.indexOf(user);
                      data[index]["role"] = "ADMIN";

                      setAllUsers(data);
                      changeRole(user.id);
                    }}
                  />
                </div>
              </Col>
              <Col lg={2}>
                <button className="extend">Extend</button>
              </Col>
              <Col lg={2}>
                <button
                  className="end-session"
                  onClick={() => {
                    setModalShow2(true);
                    setId(user.id);
                    setNumber(user.number);
                  }}
                >
                  End session
                </button>
                <End
                  show={modalShow2}
                  onHide={() => setModalShow2(false)}
                  number={number}
                  id={id}
                />
              </Col>
            </Row>
          ))}
        {filteredData
          .filter((user) => user.active === false)
          .map((user) => (
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
                <div className="number-content">
                  <h5 className="number" style={{ color: "red" }}>
                    {user.number}
                  </h5>
                  <p className="no-mergin">
                    <span className="date" style={{ color: "red" }}>
                      from {user.createdAt}{" "}
                    </span>
                    <span className="date" style={{ color: "red" }}>
                      to {user.extend}
                    </span>
                  </p>
                </div>
              </Col>
              <Col lg={2}>
                <button className="extend">Extend</button>
              </Col>
            </Row>
          ))}
      </div>
    </div>
  );
}
