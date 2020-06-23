import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PublicRoute({
  isLoggedIn,
  ...rest
}) {
  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} />;
  }
}
