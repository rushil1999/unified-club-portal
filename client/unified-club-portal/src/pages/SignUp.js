import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { SIGNUP_URL } from "../services/constants";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../components/auth/ProvideAuth";
import MessageComponent from "../components/MessageComponent";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage:
      "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v475-katie-101-abstractblackandwhitebg_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=86196a47d14e811c3149f69279f90c1e",
  },
  paper: {
    marginTop: theme.spacing(8),
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();

  const contextValue = useContext(AuthContext);
  const { setAuthState } = contextValue;

  const [userState, setUserState] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [messagePopupState, setMessagePopupState] = useState(false);

  const formChangeHandler = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setUserState({ ...userState, [fieldName]: fieldValue });
  };

  const formSubmitHandler = async event => {
    event.preventDefault();
    //TODO: validate Sign Up Object;
    const apiParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userState),
    };
    const response = await fetch(SIGNUP_URL, apiParams);
    if (!response.ok) {
      console.log("Response Status", response.status);
      console.log("Response Text", await response.text());
      window.alert("User Creation Failed");
    } else {
      const resp = await response.json();
      window.localStorage.setItem("user", JSON.stringify(resp.user));
      setAuthState(true);
      window.alert("User Creation Successfull");
      setTimeout(() => {
        history.push("/signin");
      }, 500);
    }
  };

  return (
    <React.Fragment>
      {message && (
        <MessageComponent
          open={messagePopupState}
          messageContent={message}
          setMessagePopupState={setMessagePopupState}
        />
      )}
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  autoComplete="contact"
                  onChange={formChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={formChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={formSubmitHandler}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
              spacing={5}
            >
              <Grid item>
                <Link to={"/signin"} color="secondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/"} color="secondary">
                  Go Back
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
