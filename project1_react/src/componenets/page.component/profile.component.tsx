import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./profile.component.css";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const useStyle = makeStyles({
  table: {
    minWidth: 500,
  },
});

interface ProfileProps {
  user: any;
}
export const ProfileComponent: React.FC<ProfileProps> = ({ user }) => {
  const classes = useStyles();
  const class1 = useStyle();
  const history = useHistory();
  const handleClick = () => {
    history.push("/portal");
  };

  return (
    <React.Fragment>
      <div>
        <TableContainer component={Paper} id="t-display">
          <Table className={class1.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="t-text">UUID</TableCell>
                <TableCell align="right" id="t-text">
                  First Name
                </TableCell>
                <TableCell align="right" id="t-text">
                  Last Name
                </TableCell>
                <TableCell align="right" id="t-text">
                  Email Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" id="t-text">
                  {user.id}
                </TableCell>
                <TableCell align="right" id="t-text">
                  {user.name}
                </TableCell>
                <TableCell align="right" id="t-text">
                  {user.lname}
                </TableCell>
                <TableCell align="right" id="t-text">
                  {user.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          id="portal-button"
          onClick={() => handleClick()}
        >
          Return To Portal
        </Button>
      </div>
    </React.Fragment>
  );
};
