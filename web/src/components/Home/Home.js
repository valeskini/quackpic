import "./Home.css";
import React, { useState } from "react";
import { ImagePicker } from "react-file-picker";
import { FileDrop } from "react-file-drop";
import { useKonami } from 'react-konami-code';
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Switch as RouterSwitch,
} from "react-router-dom";
const AdminPanel = () => {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_self");
};
function Home(props) {
  useKonami(AdminPanel);
  window.addEventListener(
    "dragover",
    function (e) {
      e.preventDefault();
    },
    false
  );
  window.addEventListener(
    "drop",
    function (e) {
      e.preventDefault();
    },
    false
  );
  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  let results;
  const apireq = async (IMG) => {
    if (IMG.size <= 6000000) {
      setContent(
        <div className="app">
          <div className="containerbig">
            <div className="logobig"></div>
            <h1 className="loadingtextbig">Loading</h1>
            <div className="loader"></div>
          </div>
        </div>
      );
      const formData = new FormData();
      formData.append("image", IMG);
      var requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch("https://api.quackpic.at/v1/upload/", requestOptions)
        .then((response) => response.text())
        .then((result) => (results = result))
        .catch((error) => console.log("error", error));
      setTimeout(function () {
        let obj = JSON.parse(results);
        let link =
          "/done" + "?img=" + obj.image + "?key=" + JSON.parse(results).key;
        window.location.href = link;
      }, 1500);
    } else {
      alert("The Size of the Image is too big! Maximum: 6MB");
    }
  };
  const homecontent = (
    <div className="app">
      <div className="logo"></div>
      <h1 className="logotext">Quackpic</h1>
      <FileDrop
        onDragOver={(event) => {
          document.getElementById("uploadcont").style.background = "#776539";
          document.getElementById("uploadcont").style.boxShadow =
            "11px 11px 20px 15px rgba(0, 0, 0, 0.8);";
        }}
        onDragLeave={(event) => {
          document.getElementById("uploadcont").style.background = "#e5c06c";
          document.getElementById("uploadcont").style.boxShadow =
            "11px 11px 20px 15px rgba(0, 0, 0, 0.25);";
        }}
        onDrop={(files) => {
          if (files.length <= 1) {
            let includes = files[0].type.includes("jpg");
            let includes2 = files[0].type.includes("png");
            if (includes || includes2) {
              apireq(files[0]);
            } else {
              alert(
                "This is not a Image File! Valid are only jpg and png"
              );
            }
          } else {
            alert("You can only Upload one File at Once!");
          }
        }}
      >
        <ImagePicker
          extensions={["jpg", "png"]}
          dims={{
            minWidth: 1,
            maxWidth: 1000000,
            minHeight: 1,
            maxHeight: 1000000,
          }}
          onChange={(Base64IMG) => {
            let mimeType = Base64IMG.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
            if (mimeType === "image/png") {
              urltoFile(Base64IMG, "quackpic.png", "image/png").then(function (
                file
              ) {
                apireq(file);
              });
            } else if (mimeType === "image/jpeg") {
              urltoFile(Base64IMG, "quackpic.jpg", "image/jpeg").then(function (
                file
              ) {
                apireq(file);
              });
            }
          }}
          onError={(errMsg) => alert(errMsg)}
          maxSize={10000}
        >
          <div id="uploadcont" className="container">
            <div className="uploadimg"></div>
            <h1 className="uploadtext">Upload</h1>
          </div>
        </ImagePicker>
      </FileDrop>
    </div>
  );
  const [content, setContent] = useState(homecontent);
  return content;
}

export default Home;
