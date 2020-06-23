import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PrivateRoute({
  isLoggedIn,
  ...rest
}) {
  if (isLoggedIn) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
}
