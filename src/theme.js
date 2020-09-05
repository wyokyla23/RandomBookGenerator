import { createMuiTheme } from "@material-ui/core/styles";

const lightBlue = "rgb(196, 240, 255, 0.4)";
const darkGrey = "#21201e";

export default createMuiTheme({
  palette: {
    common: {
      lightBlue: `${lightBlue}`,
      darkGrey: `${darkGrey}`,
    },
  },
});
