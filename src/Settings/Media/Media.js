import React, { useEffect, useState, useRef } from "react";
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
  const [isAtEnd, setIsAtEnd] = useState(false);
  useEffect(() => {
    function handleScroll() {
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = window.scrollY;
			if (scrolled === scrollable) {
        setIsAtEnd(true);
        getMedia();
				console.log('End');
      }
      else {
        setIsAtEnd(false);
        // getMedia();
        console.log('not yet');
			}
		}
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  function getMedia() {
    let rem = numberOfMedia - media.length;
    if (rem >= 9 || rem === 0) {
      rem = 9;
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
                    <img
                      src={photo.mediaUrl}
                      className="setting-image"
                      alt=""
                    />
                  }
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

