import React from "react";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Routes from "./router/Routes";

function App() {
  console.log("rendered");
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
