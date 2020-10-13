import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LockIcon from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Yup from "yup";

import {
  useSelector,
  useDispatch,
} from "react-redux";
import { register } from "../../stores/userStore/user-actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  signUpGridContainer: {
    alignItems: "flex-start",
    fontSize: '2rem',
    paddingTop: '3em',
    margin: '0 auto',
    maxWidth: 300
  },
  loginButton: {
    color: "blue",
    textDecoration: 'none',
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
    backgroundColor: '#ffc9b9', 
    width: '1.2em',
    height: '1.2em',
    borderRadius: '2em',
    padding: '.3em'
  }
}));

export default function SignUp(props) {
  const loading = useSelector(
    (state) => state.user.loading
  );
  const dispatch = useDispatch();

  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
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
    confirmPassword: Yup.string()
      .min(6, "Too short!")
      .max(20, "Too long!")
      .required("Required")
      .oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
  });

  const onSubmit = (values, formik) => {
    dispatch(register(values));
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
      className={classes.signUpGridContainer}
      spacing={4}
      justify='center'
      component='form'
      onSubmit={handleSubmit}
      >
        <Grid
          container
          direction='column'
          alignItems='center'
        >
          <LockIcon className={classes.lockIcon} />
          <h1 className={classes.title}>Sign up</h1>
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
            required
            tabIndex={2}
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
          <TextField
            fullWidth
            onChange={handleChange}
            required
            id="confirmPassword"
            label="confirmPassword"
            type="confirmPassword"
            error={Boolean(
              touched.confirmPassword &&
                errors.confirmPassword
            )}
            helperText={
              touched.confirmPassword &&
              errors.confirmPassword
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            style={{backgroundColor: '#ffc9b9'}}
          >
            Sign Up
          </Button>
        </Grid>
        <br/>
        {loading && <CircularProgress />}
        <Grid
          item
          className={
            classes.signupButtonContainer
          }
        >
          <Typography>
            Already have an account? <br/>Log
            in&nbsp;
            <Link
              className={classes.loginButton}
              to="/login"
            >
              here
            </Link>
          </Typography>
      </Grid>
    </Grid>
  );
}
