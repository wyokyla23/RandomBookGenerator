import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./router/Private";
import PublicRoute from "./router/Public";

const user = {
  isLoggedIn: false,
  data: null,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          userIsLoggedIn={user.isLoggedIn}
        >
          <Home />
        </PrivateRoute>
        <PublicRoute
          exact
          path="/login"
          userIsLoggedIn={user.isLoggedIn}
        >
          <Login />
        </PublicRoute>
        <PublicRoute
          exact
          path="/signUp"
          userIsLoggedIn={user.isLoggedIn}
        >
          <SignUp />
        </PublicRoute>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
