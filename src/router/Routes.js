import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./Private";
import PublicRoute from "./Public";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";

export default function Routes(props) {
  const user = useSelector((state) =>
    Boolean(state.user.data)
  );
  console.log({ user });
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        isLoggedIn={user}
      >
        <Home />
      </PrivateRoute>
      <PublicRoute
        exact
        path="/login"
        isLoggedIn={user}
      >
        <Login />
      </PublicRoute>
      <PublicRoute
        exact
        path="/signUp"
        isLoggedIn={user}
      >
        <SignUp />
      </PublicRoute>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>
  );
}
