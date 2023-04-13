import React, { useEffect, useState } from "react";
import "./Community.css";

export default function Community() {
  const URL = "https://thestockideas.com/api/v1/changeDefaultPassword";
  const [userPassword, setUser] = useState("");
  const [rootPassword, setRoot] = useState("");
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });

  useEffect(() => {
    getUser();

  }, []);

  function getUser() {
    fetch(URL, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.data.userPassord);
        setRoot(data.data.rootPassord);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser() {
    const item = {
      userPassword: userPassword,
      rootPassword: rootPassword,
    };
    console.log(item);
    fetch(URL, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(item),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="community">
      <div>
        <p>Admin default password</p>
        <div className="bar">
          <input
            id="inp1"
            type="text"
            value={userPassword}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          ></input>
          <button className="save-btn" onClick={updateUser}>
            {" "}
            Save
          </button>
        </div>
      </div>
      <div>
        <p>User default password</p>
        <div className="bar">
          <input
            id="inp2"
            type="text"
            value={rootPassword}
            onChange={(e) => {
              setRoot(e.target.value);
            }}
          ></input>
          <button className="save-btn" onClick={updateUser}>
            {" "}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
