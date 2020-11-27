import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../components/App/LandingPage";

export default function Routes() {
  const isauth = useSelector((state) => state.auth.isauth);

  return (
    <Switch>
      <Route path="/" exact render={(props) => <LandingPage props={props} />} />
    </Switch>
  );
}
