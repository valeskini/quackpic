import React from 'react';
import ReactDOM from 'react-dom';
import Switch from "./components/Router/Router";

import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch as RouterSwitch,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <RouterSwitch>
          <Route path="*">
            <Switch />
          </Route>
        </RouterSwitch>
    </Router>
    <p className="imprint"><a href="https://quackpic.at/impressum.html">Impressum</a> &nbsp;»&nbsp; <a href="https://quackpic.at/datenschutz.html">Datenschutz</a></p>
  </React.StrictMode>,
  document.getElementById('quackpic')
);

reportWebVitals();
