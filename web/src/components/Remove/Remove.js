import React, { useState } from "react";
import "./Remove.css";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation,
  Switch as RouterSwitch,
} from "react-router-dom";

function Remove(props) {
  const history = useHistory();
  const [popup, setPopup] = useState("none");
  const [errorobj, setErrorObj] = useState(false);
  const [imageobj, setImageObj] = useState("none");
  let location = props.location.pathname;
  let key = location.replace("/delete/", "");
  fetch("https://picapi.valeskini.dev/v1/key/" + key)
    .then((response) => response.json())
    .then((data) => {
      if (data !== null) {
        setImageObj(data.image);
      } else {
        setErrorObj(true);
      }
    });

  if (errorobj) {
    return (
      <div className="app">
        <div className="containerbig">
          <div className="logobig"></div>
          <h1 className="uploadtextbigdel">Error</h1>
          <h1 className="uploadtexterror">Der Token ist Falsch!</h1>
        </div>
      </div>
    );
  } else {
    let imglink = "https://pic.valeskini.dev/images/" + imageobj;

    let imglinkraw = "https://picimg.valeskini.dev/" + imageobj;
    const vorschaustyle = {
      backgroundImage: "url(" + "https://picimg.valeskini.dev/" + imageobj + ")",
    };
    return (
      <div className="app">
        <div className="containerbig">
          <div className="logobig"></div>
          <h1 className="uploadtextbigdel">Bild Löschen?</h1>
          <input readOnly value={imageobj} className="piclinksmall"></input>
          <a href={"https://picimg.valeskini.dev/" + imageobj}>
            <div style={vorschaustyle} className="imagevorschau"></div>
          </a>
          <a
            onClick={() => {
              const formData = new FormData();
              var requestOptions = {
                method: "DELETE",
              };

              fetch("https://picapi.valeskini.dev/v1/delete/" + key, {
                method: "DELETE",
              })
                .then((response) => response.json())
                .then((result) => {
                  if (result) {
                    alert("Das Bild wurde erfolgreich Gelöscht!");
                    history.replace("/");
                  }
                });
            }}
            className="linkdeletebestatigen"
          >
            <p className="buttontextdel">Löschen Bestätigen</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Remove;
