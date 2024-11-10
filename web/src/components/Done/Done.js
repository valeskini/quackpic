import "./Done.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Switch as RouterSwitch,
} from "react-router-dom";
import qs from "qs";
import RViewerJS from 'viewerjs-react'
import 'viewerjs-react/dist/index.css'
function Done(props) {
  let location = props.location.pathname;

  let img = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  }).img;
  let key
  key = img.split('?key=')[1]
  img = img.split('?')[0]
  let imglink = "https://quackpic.at/images/" + img;
  let imglinkraw = "https://img.quackpic.at/" + img;
  let dellink = "https://quackpic.at/delete/" + key;
  const vorschaustyle = {
    backgroundImage: "url(" + imglinkraw + ")",
  };
  return (
    <div className="app">
      <div className="containerbig">
        <div className="logobig"></div>
        <h1 className="uploadtextbig">Fertig!</h1>
        <h2 className="linkzumteilen">\/ Link zum Anschauen \/</h2>
        <input readOnly value={imglink} className="piclink"></input>
        <h2 className="rawlink">\/ Raw Link(für Foren etc.) \/</h2>
        <input readOnly value={imglinkraw} className="piclink3"></input>
        <h2 className="linkzumloschen">\/ Link zum Löschen \/</h2>
        <input readOnly value={dellink} className="piclink2"></input>
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
        <img src={imglinkraw} className="imagevorschau"></img>
          </RViewerJS>
        <Link
          to="/"
          className="linknewupload"
        >
          <p className="buttontext">Neuer Upload</p>
        </Link>
      </div>
    </div>
  );
}

export default Done;
