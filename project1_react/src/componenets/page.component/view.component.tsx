import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./view.component.css";
import { getUserTicket } from "../../remote/auth";
import { ViewTicket } from "../../remote/models/view_tecket";

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
    minWidth: 650,
  },
});

export const ViewComponent: React.FC = () => {
  const classes = useStyles();
  const class1 = useStyle();
  const history = useHistory();
  const [a, setA] = useState<ViewTicket[]>();
  let i = 1;
  const handleClick = () => {
    history.push("/portal");
  };

  useEffect(() => {
    const renderTicket = async () => {
      const t = await getUserTicket();
      setA(t.data);
    };
    try {
      renderTicket();
    } catch (error) {}
  }, []);

  return i === 0 ? (
    <div>"I dont think so buster"</div>
  ) : (
    <React.Fragment>
      <div>
        <TableContainer component={Paper} id="table-display">
          <Table className={class1.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="table-text">UUID</TableCell>
                <TableCell align="right" id="table-text">
                  First Name
                </TableCell>
                <TableCell align="right" id="table-text">
                  Last Name
                </TableCell>
                <TableCell align="right" id="table-text">
                  Amount
                </TableCell>
                <TableCell align="right" id="table-text">
                  Submit Date
                </TableCell>
                <TableCell align="right" id="table-text">
                  Resolve Date
                </TableCell>
                <TableCell align="right" id="table-text">
                  Resolver
                </TableCell>
                <TableCell align="right" id="table-text">
                  Description
                </TableCell>
                <TableCell align="right" id="table-text">
                  Reciept
                </TableCell>
                <TableCell align="right" id="table-text">
                  Status
                </TableCell>
                <TableCell align="right" id="table-text">
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {a?.map((item) => {
                return (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      id="t-text"
                      key={item.id}
                    >
                      {item.id}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.firstName}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.lastName}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.amount}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.submitDate}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.resolveDate}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.resolver}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.description}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.receipt}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.status}
                    </TableCell>
                    <TableCell align="right" id="t-text">
                      {item.type}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root} id="button-back">
        <Button
          variant="contained"
          color="secondary"
          id="view-button"
          onClick={() => handleClick()}
        >
          Return To Portal
        </Button>
      </div>
    </React.Fragment>
  );
};
