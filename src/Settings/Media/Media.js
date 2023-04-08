import React, { useEffect, useState } from "react";
import "./Media.css";
import load from "../../Chat/images/load.gif";
export default function Media() {
  const URL = "http://127.0.0.1:4001/media";
  const [media, setMedia] = useState([]);
  const [loading, setloading] = useState(true);
  const [numberOfMedia, setNumberOfMedia] = useState();
  const [ScrollLoading, setScrollLoading] = useState();

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

  async function getMedia() {
    let rem = numberOfMedia - media.length;

    console.log(rem);
    console.log(media);
    if (rem !== 0) {
      await fetch(URL + `?take=${Math.min(rem, 15)}&skip=${media.length}`, {
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
    }
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
            <div
              className="media"
              onScroll={async (e) => {
                const all = e.target.scrollHeight - e.target.clientHeight;
                const current = e.target.scrollTop;
                const percent = parseInt((current / all) * 100);
                console.log(percent);
                if (
                  percent > 90 &&
                  !ScrollLoading &&
                  numberOfMedia !== media.length
                ) {
                  console.log("yes");
                  setScrollLoading(true);
                  await getMedia();

                  setScrollLoading(false);
                  console.log(
                    "--------------------------------------------------"
                  );
                  e.target.scrollTo(0, all / 2);
                  console.log(e.target);
                }
              }}
            >
              {media.map((photo) => (
                <div>
                  {getExtension(photo.mediaUrl).toLowerCase() === "png" ||
                  getExtension(photo.mediaUrl).toLowerCase() === "jpg" ||
                  getExtension(photo.mediaUrl).toLowerCase() === "jpeg" ? (
                    <img
                      src={photo.mediaUrl}
                      className="setting-image"
                      alt=""
                    />
                  ) : (
                    getExtension(photo.mediaUrl).toLowerCase() === "mp4" || (
                      <video
                        src={photo.mediaUrl}
                        className="setting-image"
                        alt=""
                      />
                    )
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
