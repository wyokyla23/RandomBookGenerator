import React from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
