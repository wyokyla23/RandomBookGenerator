import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {},
  homeGridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6em",
    minHeight: "700px",
    [theme.breakpoints.down("md")]: {
      minHeight: "600px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "500px",
    },
  },

  paperContainer: {
    maxWidth: "600px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "400px",
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <Grid
      style={{
        backgroundColor: "green",
        height: 500,
        padding: 25,
      }}
      justify="space-around"
      // alignItems="center"
      container
      spacing={2}
    >
      <Grid
        style={{ backgroundColor: "salmon" }}
        item
        xs={12}
        md={3}
        lg={5}
        xl={2}
      />
      <Grid
        style={{ backgroundColor: "tomato" }}
        item
        xs={12}
        md={8}
        lg={6}
        xl={9}
      />
    </Grid>
    // <div
    //   className="container"
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "50vh",
    //     width: "60vw",
    //     backgroundColor: "green",
    //   }}
    // >
    //   <div
    //     style={{
    //       height: "75%",
    //       width: "15%",
    //       backgroundColor: "salmon",
    //     }}
    //     className="book-image"
    //   />
    //   <div
    //     style={{
    //       height: "80%",
    //       width: "60%",
    //       backgroundColor: "tomato",
    //     }}
    //     className="book-description"
    //   />
    // </div>
    // <Container className={classes.paperContainer}>
    //   <Paper elevation={24}>
    //     <Grid
    //       container
    //       spacing={4}
    //       className={classes.homeGridContainer}
    //     >
    //       <Grid item>poop</Grid>
    //       <Grid item>poop</Grid>
    //     </Grid>
    //   </Paper>
    // </Container>
  );
}
