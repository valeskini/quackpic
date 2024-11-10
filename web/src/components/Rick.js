import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation,
  Switch as RouterSwitch,
} from "react-router-dom";
import RViewerJS from "viewerjs-react";
import "viewerjs-react/dist/index.css";

function Rick() {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_self");
}
export default Rick;
