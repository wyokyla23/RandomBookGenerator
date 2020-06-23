import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useSelector,
  useDispatch,
} from "react-redux";
import {
  login,
  logout,
} from "../../stores/userStore/user-actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  loginGridContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7em",
    minHeight: "300px",
    [theme.breakpoints.down("md")]: {
      minHeight: "200px",
    },
  },
  signupButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    color: "blue",
  },
  paperContainer: {
    maxWidth: "900px",
  },
}));

export default function Login(props) {
  const loading = useSelector(
    (state) => state.user.loading
  );
  const dispatch = useDispatch();

  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too short!")
      .max(20, "Too long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too short!")
      .max(20, "Too long!")
      .required("Required"),
  });

  const onSubmit = (values, formik) => {
    dispatch(login(values));
    console.log({ values });
  };

  const {
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container className={classes.paperContainer}>
      <Paper elevation={24}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={4}
            className={classes.loginGridContainer}
          >
            <Grid item>
              <TextField
                onChange={handleChange}
                required
                id="email"
                label="email"
                error={Boolean(
                  touched.email && errors.email
                )}
                helperText={
                  touched.email && errors.email
                }
              />
            </Grid>
            <Grid item>
              <TextField
                onChange={handleChange}
                required
                id="password"
                label="password"
                type="password"
                error={Boolean(
                  touched.password &&
                    errors.password
                )}
                helperText={
                  touched.password &&
                  errors.password
                }
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
              >
                Log In
              </Button>
              <Button
                type="submit"
                variant="outlined"
              >
                Log Out
              </Button>
            </Grid>
            <br />
            {loading && <CircularProgress />}
          </Grid>
          <Grid
            container
            spacing={4}
            className={
              classes.signupButtonContainer
            }
          >
            <Typography>
              No account? Sign up&nbsp;
              <Link
                className={classes.signupButton}
                to="/signUp"
              >
                here
              </Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
