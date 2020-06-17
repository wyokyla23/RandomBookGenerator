import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PrivateRoute({
  userIsLoggedIn,
  ...rest
}) {
  if (userIsLoggedIn) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
}
