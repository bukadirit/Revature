import React, { useState } from "react";
import * as loginRemote from "../../remote/user.remote";
import { setLocalUser } from "../../remote/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./login.component.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" id="copy">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/bukadirit">
        Tempest Ticketing Inc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const LoginComponent: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string>();
  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
    try {
      const r = await loginRemote.login(payload);
      setLocalUser(r.data);
      window.location.href = "/portal";
    } catch (error) {
      setErrors("Email or Password Incorrect. Please Try Again!");
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" id="container-text">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <p id="errors-msg">{errors}</p>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => handleLogin()}
          >
            Log In
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};
export default withRouter(LoginComponent);
