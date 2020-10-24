import React from "react";

import { ThemeProvider, responsiveFontSizes, createMuiTheme } from "@material-ui/core/styles";
// import theme from "./theme";
import Routes from "./router/Routes";

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

function App() {
  console.log("rendered");
  return (
    <ThemeProvider theme={theme}>

      <Routes />
    </ThemeProvider>
  );
}

export default App;
