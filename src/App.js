import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import Routes from "./router/Routes";

function App() {
  console.log("rendered");
  return (
    <ThemeProvider theme={theme}>
     
      <Routes />
    </ThemeProvider>
  );
}

export default App;
