import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "../page.component/portal.component.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import auth from "../../remote/auth";
import { AuthTemplate } from "../../remote/models/otherTemplates";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      margin: "auto",
    },
  })
);

export const PortalComponent: React.FC<RouteComponentProps> = (props) => {
  let ticket: AuthTemplate;
  ticket = auth.getLocalUser();
  const classes = useStyles();
  const handleProfile = () => {
    props.history.push("/profile");
  };
  const handleView = () => {
    props.history.push("/view");
  };

  const handleRequest = () => {
    props.history.push("/request");
  };
  const handleManager = () => {
    props.history.push("/manager");
  };

  return ticket.role === "1" ? (
    <React.Fragment>
      <div className={classes.root} id="panels-layout">
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleProfile()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    Profile
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    You may select this card if you wish to see your personal
                    information.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleView()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    View Tickets
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    You may select this card if you wish to view your pending or
                    passed tickets.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleRequest()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    Create A Ticket
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    Select this card if you want to create a ticket for
                    submission.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className={classes.root} id="panels-layout">
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleProfile()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    Profile
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    You may select this card if you wish to see your personal
                    information.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleView()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    View Tickets
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    You may select this card if you wish to view your pending or
                    passed tickets.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleRequest()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    Create A Ticket
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    Select this card if you want to create a ticket for
                    submission.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          className={classes.paper}
          id="layout-top"
          style={{ cursor: "pointer" }}
          onClick={() => handleManager()}
        >
          <Grid container spacing={2} id="container-attributes">
            <Grid item xs={12} sm container id="fixPadding">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item id="fixPadding">
                  <Typography variant="body2" id="card-head">
                    Administrative Section
                  </Typography>
                </Grid>
                <Grid item xs id="bg">
                  <Typography gutterBottom variant="subtitle1" id="card-body">
                    Approve or deny pending requests from employess.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default withRouter(PortalComponent);
