import React, { useState } from "react";
import "./View.css";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation,
  Switch as RouterSwitch,
} from "react-router-dom";
import RViewerJS from 'viewerjs-react'
import 'viewerjs-react/dist/index.css'

function View(props) {
  const history = useHistory();
  let location = props.location.pathname;
  const [popup, setPopup] = useState("none");
  const [errorobj, setErrorObj] = useState(false);
  const [imageobj, setImageObj] = useState("none");
  let newloc = location.replace("/images/", "");

  location.replace("https://img.quackpic.at/" + newloc);
  fetch("https://img.quackpic.at/" + newloc)
    .then((response) => response.json())
    .then((data) => {
      if (data.respond === false) {
        setErrorObj(true);
      } else {
        setImageObj(data.image);
      }
    });
  let imglink = "https://quackpic.at/images/" + newloc;
  let imglinkraw = "https://img.quackpic.at/" + newloc;
  let dellink = "https://quackpic.at/delete/" + newloc;
  const vorschaustyle = {
    backgroundImage: "url(" + "https://img.quackpic.at/" + newloc + ")",
  };
  const popupstyle = {
    display: popup,
  };
  let modal = document.getElementById("modal");
  let closespan = document.getElementById("closespan");
  window.onclick = function (event) {
    if (event.target === modal) {
      setPopup("none");
    } else if (event.target === closespan) {
      setPopup("none");
    }
  };
  if (errorobj) {
    return (
      <div className="app">
        <div className="containerbig">
          <div className="logobig"></div>
          <h1 className="uploadtextbigdel">Error</h1>
          <h1 className="uploadtexterror">Das Bild wurde nicht gefunden!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="containerbig">
          <div className="logobig"></div>
          <input readOnly value={newloc} className="piclinkfull"></input>
          <a
            onClick={() => {
              navigator.clipboard.writeText(imglink);
              alert("Link Kopiert!");
            }}
            className="linkkopieren"
          >
            <p className="buttontext">Link Kopieren</p>
          </a>
          <RViewerJS>
            <img src={imglinkraw} className="imagevorschaubig"></img>
          </RViewerJS>
          <div style={popupstyle} id="modal" className="modal">
            <div className="modal-content">
              <span id="closespan" className="closespan">
                &times;
              </span>
              <h3 className="modal-title">Bild Löschen</h3>
              <p className="modal-text">
                {" "}
                Hi, du bist ersteller des Bilds, und willst es Löschen? Kein
                Problem. Beim Hochladen bekommt jedes Bild einen Individuellen
                Token. Dieser ist in einem Link verpackt der beim Hochladen
                angezeigt wird. Wenn du diesen Link Aufrufst. Kannst du das Bild
                Löschen! (Dies müssen wir tun da es sonst Sicherheitsprobleme
                gäbe und dies nicht unserer Datenschutzerklärung entspräche!)
              </p>
            </div>
          </div>
          <a
            onClick={() => {
              if (popup === "block") {
                setPopup("none");
              } else if (popup === "none") {
                setPopup("block");
              }
            }}
            className="linkdelete"
          >
            <p className="buttontext">Bild Löschen</p>
          </a>
        </div>
      </div>
    );
  }
}
export default View;
