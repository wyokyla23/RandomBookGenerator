import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PublicRoute({
  userIsLoggedIn,
  ...rest
}) {
  if (userIsLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} />;
  }
}
