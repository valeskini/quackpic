import React from "react";
import Remove from "../Remove/Remove";
import Home from "../Home/Home";
import View from "../View/View";
import Done from "../Done/Done";
import Rick from "../Rick";

import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Redirect,
  Switch as RouterSwitch,
} from "react-router-dom";

const Switch = () => {
  const location = useLocation();

  return (
    <div className="content">
      <RouterSwitch location={location}>
        <Route path="/" exact>
          <Home />
          {window.scrollTo(0, 0)}
        </Route>
        <Route path="/delete/">
          <Remove location={location} />
          {window.scrollTo(0, 0)}
        </Route>
        <Route path="/images/">
          <View location={location} />
          {window.scrollTo(0, 0)}
        </Route>

        <Route path="/done">
          <Done location={location} />
          {window.scrollTo(0, 0)}
        </Route>
        <Route path="/bilder/">
          <Rick />
        </Route>
        <Route path="/admin/">
          {/* <Admin /> */}
          {window.scrollTo(0, 0)}
        </Route>
        <Route path="*">
          <Redirect to="/" />
          {window.scrollTo(0, 0)}
        </Route>
      </RouterSwitch>
    </div>
  );
};

export default Switch;
