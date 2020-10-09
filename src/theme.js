import { createMuiTheme } from "@material-ui/core/styles";

const transparent = "rgb(255,255,255,0)";
const darkGrey = "#21201e";

export default createMuiTheme({
  palette: {
    common: {
      transparent: `${transparent}`,
      darkGrey: `${darkGrey}`,
    },
  },
});
