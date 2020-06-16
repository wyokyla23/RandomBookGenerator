import { createMuiTheme } from "@material-ui/core/styles";

const sunlight = "#ffe4bd";
const sunset = "black";

export default createMuiTheme({
  palette: {
    common: {
      yellow: `${sunlight}`,
      rose: `${sunset}`,
    },
  },
});
