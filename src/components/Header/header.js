import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.common.rose,
    fontSize: "1.5rem",
    fontWeight: 400,
  },
  links: {
    color: theme.palette.common.rose,
  },
  appBar: {
    backgroundColor: theme.palette.common.yellow,
    boxShadow: "10px 20px 20px #888888",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="static"
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <MenuBookTwoToneIcon
              className={classes.links}
            />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
          >
            Random Book Generator
          </Typography>
          <Button
            className={classes.links}
            color="inherit"
            component={Link}
            to="profile"
          >
            Login
          </Button>
          <Button
            className={classes.links}
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
