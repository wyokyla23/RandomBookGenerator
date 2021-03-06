import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuBookTwoToneIcon from "@material-ui/icons/MenuBookTwoTone";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { logout } from "../../stores/userStore/user-actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#21201e',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  },
  links: {
    color: "#21202e",
  },
  // appBar: {
  //   backgroundColor: 'transparent'
  // },
}));

export default function Header(props) {
  const dispatch = useDispatch();
  const userId = useSelector(
    ({ user }) => user.data?.id
  );
  console.log({ userId });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header
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
            onClick={() => dispatch(logout())}
          >
            Logout
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
      </header>
    </div>
  );
}
