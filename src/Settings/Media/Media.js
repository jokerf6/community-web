import React, { useEffect, useState } from "react";
import "./Media.css";
import load from "../../Chat/images/load.gif";
export default function Media() {
  const URL = "http://127.0.0.1:4001/media";
  const [media, setMedia] = useState([]);
  const [loading, setloading] = useState(true);
  const [numberOfMedia, setNumberOfMedia] = useState();
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("Access Token")}`,
  });
  function getExtension(filename) {
    if (filename) {
      return filename.split(".").pop();
    }
  }
  useEffect(() => {
    getMedia();
  }, []);

  function getMedia() {
    let rem = numberOfMedia - media.length;
    if (rem >= 6 || rem === 0) {
      rem = 6;
    }
    console.log(rem);
    console.log(media);
    fetch(URL + `?take=${rem}&skip=${media.length}`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setMedia((prevState) => [...prevState, ...data.data.media]);
        // setMedia(data.data.media);
        // setMedia((list) => [...data.data.media, ...list]);
			  // setMedia((prevState) => [...prevState, data.data.media]);
        setNumberOfMedia(data.data.allMedia);
      })
      .catch((err) => {
        console.log(err);
      });
    setloading(false);
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
        <>
          {media.length === 0 ? (
            <p className="noData">There are no people in the waiting list</p>
          ) : (
            <div className="media">
              {media.map((photo) => (
                <div>
                  {
                    (getExtension(photo.mediaUrl).toLowerCase() === "png" ||
                      getExtension(photo.mediaUrl).toLowerCase() === "jpg" ||
                      getExtension(photo.mediaUrl).toLowerCase() === "jpeg")
                    && (
                    <img
                      src={photo.mediaUrl}
                      className="setting-image"
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

