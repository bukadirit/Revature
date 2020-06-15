import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./navbar.component.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface NavProps {
  user: any;
}

export const NavbarComponent: React.FC<NavProps> = ({ user }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" id="app-bar">
        <Toolbar id="tool-bar">
          <Typography variant="h6" className={classes.title} id="app-bar-text">
            {user.name == null
              ? "Tempest Ticketing Systems"
              : "Welcome to your portal "}
            {user.name}
          </Typography>
          <Link id="logout-link" to="/logout">
            <Button
              variant="contained"
              color="secondary"
              disabled={user.name == null ? true : false}
            >
              Log Out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
