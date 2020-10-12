import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockIcon from '@material-ui/icons/Lock';

import {
  useSelector,
  useDispatch,
} from "react-redux";
import { login } from "../../stores/userStore/user-actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  loginGridContainer: {
    alignItems: 'flex-start',
    fontSize: '2rem',
    paddingTop: '3em',
    margin: "0 auto",
    maxWidth: 300
  },
 
  signupButton: {
    color: "blue",
    textDecoration: 'none'
  },
  formWrapper: {
    height: '500px',
    width: '900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '64px',
    border: 'solid',
  },
  title: {
    margin: '0.3em'
  },
  lockIcon: {
    backgroundColor: '#3DCCCC', 
    width: '1.2em',
    height: '1.2em',
    borderRadius: '2em',
    padding: '.3em'
  }
  
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
    <Grid
      container
      spacing={4}
      justify="center"
      className={classes.loginGridContainer}
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <LockIcon className={classes.lockIcon} />
        <h1 className={classes.title}>Sign in</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          onChange={handleChange}
          tabIndex={1}
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
      <Grid item xs={12}>
        <TextField
          fullWidth
          onChange={handleChange}
          tabIndex={2}
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
      <Grid item xs={12}>
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          style={{backgroundColor: '#3DCCCC'}}
        >
          Log In
        </Button>
      </Grid>
      <br />
      {loading && <CircularProgress />}
      <Grid
        item
        className={
          classes.loginButtonContainer
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
    </Grid>
  );
}
